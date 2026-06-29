'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const DESKTOP = [
  { href: '/', label: 'หน้าหลัก' },
  { href: '/about', label: 'เกี่ยวกับเรา', caret: true },
];

const MOBILE = [
  { href: '/', label: 'หน้าหลัก' },
  { href: '#', label: 'สินค้า & หลักสูตร' },
  { href: '#', label: 'บริการครบวงจร' },
  { href: '#', label: 'จงทำดี' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '#', label: 'ข่าวสาร' },
  { href: '#', label: 'ติดต่อเรา' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const on = (href: string) => (pathname === href ? 'on' : undefined);

  return (
    <header className="nav">
      <div className="wrap">
        <div className="row">
          <Link className="logo" href="/">
            <span className="chip">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </span>
            <span>
              <span className="wm">Prosperous</span>
              <span className="sub">Rescue Swimming</span>
            </span>
          </Link>

          <button className="srch" aria-label="ค้นหา">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <nav className="menu">
            {DESKTOP.map((l) => (
              <Link key={l.label} href={l.href} className={on(l.href)}>
                {l.label}
                {l.caret && (
                  <svg className="car" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="right">
            <span className="lang">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
              ไทย
            </span>
            <div className="socials">
              <a href="#" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8H4v11h2.5V8zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 19h-2.5v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.7 1.3-.1.2-.1.5-.1.8V19H9.5V8H12v1.5c.4-.6 1.1-1.4 2.7-1.4 2 0 3.3 1.3 3.3 4V19z" /></svg></a>
              <a href="#" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3-.4-4.3a2.6 2.6 0 0 0-1.8-1.8C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7C2 9 2 12 2 12s0 3 .4 4.3a2.6 2.6 0 0 0 1.8 1.8c1.3.4 7.8.4 7.8.4s6.5 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z" /></svg></a>
            </div>
          </div>

          <button className="burger" aria-label="เมนู" onClick={() => setOpen((v) => !v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <div className={open ? 'mpanel open' : 'mpanel'}>
        {MOBILE.map((l, i) => (
          <Link key={i} href={l.href} className={on(l.href)} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}