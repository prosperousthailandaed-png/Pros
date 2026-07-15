'use client';

// components/ContactChatPanel.tsx
// แผงแชทที่ "เปิดอยู่แล้ว" ทันทีที่เข้าหน้า /contact ไม่ต้องกดปุ่มไหนก่อน
// ต่อกับ Supabase Realtime จริง — ข้อความที่พิมพ์จะถูกบันทึกและแอดมิน
// ตอบกลับผ่านหน้า /admin/chat ได้แบบเรียลไทม์
//
// ใช้ Supabase Anonymous Auth ผูก session ลูกค้าแต่ละคนกับ auth.uid() คงที่
// (จำเป็นสำหรับ RLS ใหม่ — ลูกค้าอ่านได้เฉพาะบทสนทนาของตัวเองเท่านั้น)
// ⚠️ ต้องเปิด Authentication > Sign In / Providers > Anonymous ใน Supabase Dashboard ก่อน
//
// กันสแปม 3 ชั้น:
//   1. Cooldown ฝั่ง client — ส่งได้ทุก ๆ SEND_COOLDOWN_MS มิลลิวินาที
//   2. MAX_MESSAGE_LENGTH ฝั่ง client — จำกัดความยาวข้อความต่อครั้ง
//   3. DB constraint + trigger ใน sql/security-fixes.sql — กันคนยิง API ข้าม client โดยตรง

import { useEffect, useRef, useState, useCallback } from 'react';
import { contactChannels } from '@/lib/data/contact-channels';
import { supabase } from '@/lib/supabase/client';
import type { Message } from '@/lib/types/chat';

const STORAGE_KEY = 'prosperous_conversation_id';
const SEND_COOLDOWN_MS = 2000;
const MAX_MESSAGE_LENGTH = 300;

export default function ContactChatPanel() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [cooldown, setCooldown] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);

  const line = contactChannels.find((c) => c.id === 'line');
  const messenger = contactChannels.find((c) => c.id === 'messenger');
  const phone = contactChannels.find((c) => c.id === 'phone');

  useEffect(() => {
    async function ensureCustomerUserId(): Promise<string | null> {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) return sessionData.session.user.id;

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error || !data.user) {
        console.error('signInAnonymously error:', error?.message);
        return null;
      }
      return data.user.id;
    }

    async function initConversation() {
      const userId = await ensureCustomerUserId();
      if (!userId) return;

      const existingId = localStorage.getItem(STORAGE_KEY);

      if (existingId) {
        const { data } = await supabase
          .from('conversations')
          .select('id')
          .eq('id', existingId)
          .maybeSingle();

        if (data) {
          setConversationId(data.id);
          return;
        }
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert({ customer_name: 'ลูกค้าเว็บไซต์', customer_user_id: userId })
        .select('id')
        .single();

      if (!error && data) {
        localStorage.setItem(STORAGE_KEY, data.id);
        setConversationId(data.id);
      }
    }

    initConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    async function loadMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    }
    loadMessages();

    const channel = supabase
      .channel(`customer-messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: { new: Message }) => {
          const msg = payload.new as Message;
          setMessages((prev) =>
            prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (cooldown || !conversationId) return;

      const text = input.trim();
      if (!text) return;

      setInput('');
      setCooldown(true);
      setTimeout(() => setCooldown(false), SEND_COOLDOWN_MS);

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_type: 'customer',
          content: text,
        })
        .select()
        .single();

      if (error) {
        console.error('send message error:', error.message);
        return;
      }

      if (data) {
        setMessages((prev) => [...prev, data as Message]);
      }
    },
    [cooldown, conversationId, input]
  );

  return (
    <div className="chat-panel reveal">
      <div className="chat-panel__header">
        <span className="chat-panel__dot" aria-hidden="true" />
        <div>
          <p className="chat-panel__title">แชทกับเราได้เลย</p>
          <p className="chat-panel__status">ทีมงานพร้อมตอบในเวลาทำการ</p>
        </div>
      </div>

      <div className="chat-panel__log" ref={logRef}>
        <div className="chat-panel__bubble">
          สวัสดีค่ะ 👋 มีอะไรให้โพรสเพอรัสช่วยไหมคะ เลือกช่องทางด้านล่าง
          หรือพิมพ์ข้อความดูได้เลย
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.sender_type === 'customer'
                ? 'chat-panel__bubble chat-panel__bubble--user'
                : 'chat-panel__bubble'
            }
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="chat-panel__quick">
        {line && (
          <a href={line.href} target="_blank" rel="noopener noreferrer" className="chat-panel__quick-btn">
            แชทผ่าน LINE
          </a>
        )}
        {messenger && (
          <a href={messenger.href} target="_blank" rel="noopener noreferrer" className="chat-panel__quick-btn">
            แชทผ่าน Messenger
          </a>
        )}
        {phone && (
          <a href={phone.href} className="chat-panel__quick-btn">
            โทรเลย
          </a>
        )}
      </div>

      <form className="chat-panel__form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={cooldown ? 'รอสักครู่...' : 'พิมพ์ข้อความ...'}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={cooldown || !conversationId}
          className="chat-panel__input"
        />
        <button type="submit" className="chat-panel__send" disabled={cooldown || !conversationId}>
          ส่ง
        </button>
      </form>
    </div>
  );
}