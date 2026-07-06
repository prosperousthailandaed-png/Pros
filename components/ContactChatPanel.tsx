'use client';

// components/ContactChatPanel.tsx
// แผงแชทที่ "เปิดอยู่แล้ว" ทันทีที่เข้าหน้า /contact ไม่ต้องกดปุ่มไหนก่อน
// ยังไม่มี live chat backend จริง เลยทำเป็น auto-reply ง่าย ๆ:
//   ผู้ใช้พิมพ์อะไรมาก็ตาม ระบบตอบกลับอัตโนมัติทันที ไล่ไปช่องทางที่ตอบจริงได้
//   (LINE / Messenger / โทร) ไม่มีการเก็บ/ส่งข้อความไปที่ไหนทั้งสิ้น
//
// กันสแปม 2 ชั้น:
//   1. Cooldown — ส่งได้ทุก ๆ SEND_COOLDOWN_MS มิลลิวินาที ปุ่ม/ช่องพิมพ์จะถูกปิดชั่วคราว
//   2. MAX_MESSAGE_LENGTH — จำกัดความยาวข้อความต่อครั้ง กันวางข้อความยาว ๆ ถล่ม
//   (log ก็ตั้ง max-height + overflow-y: auto ใน CSS ไว้แล้ว เลยไม่ดันความสูงหน้าเว็บ
//    ต่อให้มีข้อความเยอะแค่ไหนก็เลื่อนอ่านแทน)
//
// TODO: ถ้าจะทำแชทเรียลไทม์จริงในอนาคต ให้เปลี่ยนส่วน handleSend
//       ไปต่อกับ live chat backend จริง (เช่น LINE OA Chat Plugin, Crisp, Tawk.to)

import { useEffect, useRef, useState } from 'react';
import { contactChannels } from '@/lib/data/contact-channels';

type ChatMessage = {
  from: 'bot' | 'user';
  text: string;
};

const AUTO_REPLY =
  'ขอบคุณที่ทักมาค่ะ 🙏 ตอนนี้แชทหน้าเว็บยังไม่รองรับการตอบกลับเรียลไทม์ รบกวนทักต่อทาง LINE หรือ Messenger ด้านล่างนี้ได้เลยค่ะ ทีมงานจะตอบไวกว่ามากค่ะ';

const SEND_COOLDOWN_MS = 2000; // ส่งได้ทุก 2 วิ กันสแปมกดรัว ๆ
const MAX_MESSAGE_LENGTH = 300; // กันวางข้อความยาว ๆ ถล่ม

export default function ContactChatPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [cooldown, setCooldown] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);

  // เลื่อนไปข้อความล่าสุดอัตโนมัติทุกครั้งที่มีข้อความใหม่
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const line = contactChannels.find((c) => c.id === 'line');
  const messenger = contactChannels.find((c) => c.id === 'messenger');
  const phone = contactChannels.find((c) => c.id === 'phone');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown) return; // กันสแปม: ยังอยู่ในช่วง cooldown

    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', text: AUTO_REPLY },
    ]);
    setInput('');

    setCooldown(true);
    setTimeout(() => setCooldown(false), SEND_COOLDOWN_MS);
  };

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

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.from === 'user'
                ? 'chat-panel__bubble chat-panel__bubble--user'
                : 'chat-panel__bubble'
            }
          >
            {m.text}
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
          disabled={cooldown}
          className="chat-panel__input"
        />
        <button type="submit" className="chat-panel__send" disabled={cooldown}>
          ส่ง
        </button>
      </form>
    </div>
  );
}