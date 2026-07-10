'use client';

// components/ContactChatPanel.tsx
// แผงแชทที่ "เปิดอยู่แล้ว" ทันทีที่เข้าหน้า /contact ไม่ต้องกดปุ่มไหนก่อน
// ต่อกับ Supabase Realtime จริงแล้ว — ข้อความที่พิมพ์จะถูกบันทึกและแอดมิน
// ตอบกลับผ่านหน้า /admin/chat ได้แบบเรียลไทม์
//
// การทำงาน:
//   - สร้าง/ดึง conversation จาก localStorage (STORAGE_KEY) กันบทสนทนาหายตอนรีเฟรช
//   - subscribe realtime ฟังข้อความใหม่จากแอดมิน
//   - ยังคงปุ่มลัดไป LINE / Messenger / โทร ไว้เผื่อคนอยากคุยช่องทางอื่นแทน
//
// กันสแปม 2 ชั้น (เหมือนเดิม):
//   1. Cooldown — ส่งได้ทุก ๆ SEND_COOLDOWN_MS มิลลิวินาที ปุ่ม/ช่องพิมพ์จะถูกปิดชั่วคราว
//   2. MAX_MESSAGE_LENGTH — จำกัดความยาวข้อความต่อครั้ง กันวางข้อความยาว ๆ ถล่ม

import { useEffect, useRef, useState, useCallback } from 'react';
import { contactChannels } from '@/lib/data/contact-channels';
import { supabase } from '@/lib/supabase/client';
import type { Message } from '@/lib/types/chat';

const STORAGE_KEY = 'prosperous_conversation_id';
const SEND_COOLDOWN_MS = 2000; // ส่งได้ทุก 2 วิ กันสแปมกดรัว ๆ
const MAX_MESSAGE_LENGTH = 300; // กันวางข้อความยาว ๆ ถล่ม

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
    async function initConversation() {
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
        .insert({ customer_name: 'ลูกค้าเว็บไซต์' })
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
        (payload) => {
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
  }, [conversationId, supabase]);

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

      const { data } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_type: 'customer',
          content: text,
        })
        .select()
        .single();

      if (data) {
        setMessages((prev) => [...prev, data as Message]);
      }
    },
    [cooldown, conversationId, input, supabase]
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
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel__quick-btn"
          >
            แชทผ่าน LINE
          </a>
        )}
        {messenger && (
          <a
            href={messenger.href}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel__quick-btn"
          >
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
        <button
          type="submit"
          className="chat-panel__send"
          disabled={cooldown || !conversationId}
        >
          ส่ง
        </button>
      </form>
    </div>
  );
}