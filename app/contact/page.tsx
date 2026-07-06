// app/contact/page.tsx
// หน้าช่องทางติดต่อ — วนจาก contactChannels ไม่ต้อง hardcode การ์ดทีละอัน

import { contactChannels, type ContactIcon } from '@/lib/data/contact-channels';
import ContactChatPanel from '@/components/ContactChatPanel';

export const metadata = {
  title: 'ช่องทางติดต่อ | Prosperous',
  description:
    'ติดต่อโพรสเพอรัสผ่านแชทสด LINE โทรศัพท์ Facebook Messenger หรืออีเมล',
};

// ไอคอนแบบเรียบง่าย (ไม่ใช้โลโก้แบรนด์จริงเพื่อเลี่ยงปัญหาลิขสิทธิ์)
function ContactIconSvg({ type }: { type: ContactIcon }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'chat':
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case 'line':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="4" />
          <path d="M7 9v5M11 9v5M11 9l3 5M18 9h-3v5h3M15 11.5h2.5" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2z" />
        </svg>
      );
    case 'messenger':
      return (
        <svg {...common}>
          <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.2 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2z" />
          <path d="m7 13 3.4-3.6L13 12l3.6-3.8" />
        </svg>
      );
    case 'email':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="mist" id="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">ช่องทางติดต่อ</h2>
            <p className="sub">
              เลือกช่องทางที่สะดวก ทีมงานของเราพร้อมให้บริการและตอบทุกคำถาม
            </p>
          </div>

          <div className="contact-layout">
            <ContactChatPanel />

            <div className="contact-grid">
              {contactChannels.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-card reveal"
                >
                  <div className="contact-card__icon">
                    <ContactIconSvg type={c.icon} />
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                  <span className="contact-card__cta">
                    {c.ctaLabel} <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}