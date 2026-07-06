import Link from 'next/link';
import { courses } from '@/lib/data/courses';
import { contactChannels } from '@/lib/data/contact-channels';

const SOCIALS = [
  { label: 'Facebook', href: '#', path: <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />, fill: true },
  { label: 'Instagram', href: '#', path: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>, fill: false },
  { label: 'LinkedIn', href: '#', path: <path d="M6.5 8H4v11h2.5V8zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 19h-2.5v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.7 1.3-.1.2-.1.5-.1.8V19H9.5V8H12v1.5c.4-.6 1.1-1.4 2.7-1.4 2 0 3.3 1.3 3.3 4V19z" />, fill: true },
  { label: 'YouTube', href: '#', path: <path d="M22 12s0-3-.4-4.3a2.6 2.6 0 0 0-1.8-1.8C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7C2 9 2 12 2 12s0 3 .4 4.3a2.6 2.6 0 0 0 1.8 1.8c1.3.4 7.8.4 7.8.4s6.5 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z" />, fill: true },
];

export default function Footer() {
  const line = contactChannels.find((c) => c.id === 'line');
  const phone = contactChannels.find((c) => c.id === 'phone');
  const email = contactChannels.find((c) => c.id === 'email');

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        {/* แบรนด์ + โซเชียล */}
        <div className="footer-col footer-col--brand">
          <Link href="/" className="footer-logo">
            <span className="footer-logo__mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </span>
            Prosperous
          </Link>
          <p className="footer-desc">
            ตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล
            พร้อมหลักสูตรฝึกอบรมการช่วยชีวิตและกู้ภัยทางน้ำ
          </p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="footer-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth="2">
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* สินค้า */}
        <div className="footer-col">
          <h4 className="footer-heading">สินค้า</h4>
          <ul className="footer-links">
            <li><Link href="/products/aed">เครื่อง AED</Link></li>
            <li><Link href="/products/auto-cpr">Auto CPR</Link></li>
            <li><Link href="/products/physio">อุปกรณ์กายภาพบำบัด</Link></li>
          </ul>
        </div>

        {/* หลักสูตร */}
        <div className="footer-col">
          <h4 className="footer-heading">หลักสูตร</h4>
          <ul className="footer-links">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* บริษัท */}
        <div className="footer-col">
          <h4 className="footer-heading">เกี่ยวกับ</h4>
          <ul className="footer-links">
            <li><Link href="/about">เกี่ยวกับเรา</Link></li>
            <li><Link href="/articles">บทความ &amp; ความรู้</Link></li>
            <li><Link href="/contact">ช่องทางติดต่อ</Link></li>
          </ul>
        </div>

        {/* ติดต่อด่วน */}
        <div className="footer-col">
          <h4 className="footer-heading">ติดต่อเรา</h4>
          <ul className="footer-links">
            {phone && <li><a href={phone.href}>{phone.title}</a></li>}
            {line && (
              <li>
                <a href={line.href} target="_blank" rel="noopener noreferrer">
                  {line.title}
                </a>
              </li>
            )}
            {email && <li><a href={email.href}>{email.title}</a></li>}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom__inner">
          <span>© 2568 <b>Prosperous</b> Co., Ltd.</span>
          <span>นวัตกรรมช่วยชีวิต · อบรม CPR &amp; AED · กู้ภัยทางน้ำ</span>
        </div>
      </div>
    </footer>
  );
}