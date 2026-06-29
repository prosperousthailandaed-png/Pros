import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap">
        <div className="row">
          <Link href="/" className="logo">
            <span className="chip"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg></span>
            <span><span className="wm">Prosperous</span><span className="sub">Rescue Swimming</span></span>
          </Link>
          <nav className="menu">
            <Link href="/" className="on">หน้าหลัก</Link>
            <Link href="/about">เกี่ยวกับเรา</Link>
          </nav>
          {/* ปุ่ม Burger และอื่นๆ ย้ายมาไว้ที่นี่ */}
        </div>
      </div>
    </header>
  );
}