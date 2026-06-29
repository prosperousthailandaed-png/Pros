"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            <span><span className="wm">Prosperous</span><span className="sub">Rescue Swimming</span></span>
          </Link>
          <button className="srch" aria-label="ค้นหา">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <nav className="menu">
            <Link href="/" className={pathname === "/" ? "on" : ""}>หน้าหลัก</Link>
            <Link href="/about" className={pathname === "/about" ? "on" : ""}>เกี่ยวกับเรา</Link>
          </nav>

          <button className="burger" onClick={() => setIsOpen(!isOpen)} aria-label="เมนู">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`mpanel ${isOpen ? "open" : ""}`}>
        <Link href="/" className={pathname === "/" ? "on" : ""}>หน้าหลัก</Link>
        <Link href="/about" className={pathname === "/about" ? "on" : ""}>เกี่ยวกับเรา</Link>
      </div>
    </header>
  );
}