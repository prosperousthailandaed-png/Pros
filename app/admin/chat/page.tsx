'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Conversation, Message } from '@/lib/types/chat';

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadConversations() {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_at', { ascending: false });
      if (data) setConversations(data);
    }
    loadConversations();

    const channel = supabase
      .channel('admin-conversations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        () => loadConversations()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const msg = payload.new as Message;
          if (msg.sender_type === 'customer' && msg.conversation_id !== activeId) {
            setUnreadMap((prev) => ({
              ...prev,
              [msg.conversation_id]: (prev[msg.conversation_id] ?? 0) + 1,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;

    async function loadMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', activeId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
      setUnreadMap((prev) => ({ ...prev, [activeId!]: 0 }));
    }
    loadMessages();

    const channel = supabase
      .channel(`admin-messages-${activeId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${activeId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !activeId) return;
    const content = input.trim();
    setInput('');

    await supabase.from('messages').insert({
      conversation_id: activeId,
      sender_type: 'admin',
      content,
    });
  }, [input, activeId]);

  async function closeConversation(id: string) {
    await supabase.from('conversations').update({ status: 'closed' }).eq('id', id);
  }

  return (
    <div className="admin-chat-layout">
      <aside className="admin-chat-list">
        <h2>บทสนทนา</h2>
        {conversations.map((c) => (
          <button
            key={c.id}
            className={`admin-chat-item ${activeId === c.id ? 'active' : ''}`}
            onClick={() => setActiveId(c.id)}
          >
            <span className="admin-chat-item-name">{c.customer_name}</span>
            <span className="admin-chat-item-status">{c.status === 'open' ? 'เปิด' : 'ปิด'}</span>
            {unreadMap[c.id] > 0 && (
              <span className="admin-chat-badge">{unreadMap[c.id]}</span>
            )}
          </button>
        ))}
      </aside>

      <main className="admin-chat-thread">
        {!activeId ? (
          <p className="admin-chat-empty">เลือกบทสนทนาจากรายการด้านซ้าย</p>
        ) : (
          <>
            <div className="admin-chat-thread-header">
              <span>
                {conversations.find((c) => c.id === activeId)?.customer_name}
              </span>
              <button onClick={() => closeConversation(activeId)}>ปิดบทสนทนา</button>
            </div>

            <div className="admin-chat-messages" ref={scrollRef}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`admin-chat-bubble ${m.sender_type === 'admin' ? 'from-admin' : 'from-customer'}`}
                >
                  {m.content}
                </div>
              ))}
            </div>

            <div className="admin-chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์ข้อความ..."
              />
              <button onClick={sendMessage}>ส่ง</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}