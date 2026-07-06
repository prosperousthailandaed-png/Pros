'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Child = { href: string; label: string };
type NavItem = { href: string; label: string; children?: Child[] };

const DESKTOP: NavItem[] = [
  {
    href: '/products',
    label: 'สินค้า',
    children: [
      { href: '/products/aed', label: 'AED' },
      { href: '/products/auto-cpr', label: 'AUTO CPR' },
      { href: '/products/physio', label: 'อุปกรณ์กายภาพ'},
    ],
  },
  {
    href: '/courses',
    label: 'หลักสูตร',
    children: [
      { href: '/courses/cpr-aed-basic', label: 'AED (CPR & AED Training)' },
      { href: '/courses/rescue-swimmer', label: 'Rescue Swimmer' },
      { href: '/courses/rescue-diver', label: 'Rescue Diver' },
      { href: '/courses/lifeguard-training', label: 'Lifeguard Training' },
    ],
  },
  { href: '/articles', label: 'บทความ' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/contact', label: 'ติดต่อเรา' },
];

const MOBILE: NavItem[] = [
  {
    href: '/products',
    label: 'สินค้า',
    children: [
      { href: '/products/aed', label: 'AED' },
      { href: '/products/auto-cpr', label: 'AUTO CPR' },
      { href: '/products/physio', label: 'อุปกรณ์กายภาพ'},
    ],
  },
  {
    href: '/courses',
    label: 'หลักสูตร',
    children: [
      { href: '/courses/cpr-aed-basic', label: 'AED (CPR & AED Training)' },
      { href: '/courses/rescue-swimmer', label: 'Rescue Swimmer' },
      { href: '/courses/rescue-diver', label: 'Rescue Diver' },
      { href: '/courses/lifeguard-training', label: 'Lifeguard Training' },
    ],
  },
  { href: '/articles', label: 'บทความ' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/contact', label: 'ติดต่อเรา' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const isOn = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-[60] bg-[var(--black)] font-['Anuphan',sans-serif]">
      <div className="mx-auto max-w-[1180px] px-[30px] max-[680px]:px-[22px]">
        <div className="flex h-[76px] items-center gap-[18px]">
          {/* โลโก้ */}
          <Link href="/" className="flex items-center gap-[11px] no-underline">
            <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-[var(--red)] text-white">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </span>
            <span>
              <span className="block text-[21px] font-bold leading-none tracking-[-.3px] text-white">Prosperous</span>
            </span>
          </Link>

          {/* ปุ่มค้นหา */}
          <button
            aria-label="ค้นหา"
            className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[var(--line-d)] bg-transparent text-white transition hover:border-[var(--red)] hover:bg-[var(--red)]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* เมนูหลัก (เดสก์ท็อป) */}
          <nav className="ml-auto flex items-center gap-[3px] max-[1040px]:hidden">
            {DESKTOP.map((l) =>
              l.children ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(l.label)}   // เมาส์เข้า → เปิด
                  onMouseLeave={() => setOpenMenu(null)}       // เมาส์ออก → หุบ
                >
                  <button className="flex items-center gap-[5px] whitespace-nowrap rounded-[7px] px-3 py-2 text-sm font-medium text-[var(--txt-d)] transition-colors hover:text-white">
                    {l.label}
                    <svg
                      className={`h-2.5 w-2.5 opacity-60 transition-transform ${openMenu === l.label ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {openMenu === l.label && (
                    <div className="absolute left-0 top-full z-50 pt-2">   {/* ← pt-2 คือสะพาน ห้ามเป็น mt-2 */}
                      <div className="min-w-[160px] rounded-[10px] border border-[#e5e5e5] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                        {l.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            className="block whitespace-nowrap rounded-md px-3 py-2 text-[var(--ink)] no-underline hover:bg-[#f3f3f3]"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center rounded-[7px] px-3 py-2 text-sm font-medium text-[var(--txt-d)] no-underline transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* ฝั่งขวา: ภาษา + โซเชียล */}
          <div className="flex items-center gap-[15px] border-l border-[var(--line-d)] pl-4 max-[1040px]:hidden">
            <span className="flex cursor-pointer items-center gap-1.5 text-[13.5px] font-medium text-[var(--txt-d)]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
              ไทย
            </span>
            <div className="flex gap-2">
              {[
                { label: 'Facebook', path: <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />, fill: true },
                { label: 'Instagram', path: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>, fill: false },
                { label: 'LinkedIn', path: <path d="M6.5 8H4v11h2.5V8zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 19h-2.5v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.7 1.3-.1.2-.1.5-.1.8V19H9.5V8H12v1.5c.4-.6 1.1-1.4 2.7-1.4 2 0 3.3 1.3 3.3 4V19z" />, fill: true },
                { label: 'YouTube', path: <path d="M22 12s0-3-.4-4.3a2.6 2.6 0 0 0-1.8-1.8C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7C2 9 2 12 2 12s0 3 .4 4.3a2.6 2.6 0 0 0 1.8 1.8c1.3.4 7.8.4 7.8.4s6.5 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z" />, fill: true },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-[var(--line-d)] text-[#cfd2d8] transition hover:border-[var(--red)] hover:bg-[var(--red)] hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth="2">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ปุ่ม hamburger (มือถือ) */}
          <button
            aria-label="เมนู"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto hidden h-[42px] w-[42px] place-items-center rounded-[9px] border border-[var(--line-d)] bg-transparent text-white max-[1040px]:grid"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* แผงเมนูมือถือ */}
      <div className={`${open ? 'block' : 'hidden'} border-t border-[var(--line-d)] bg-[#0f1013]`}>
        {MOBILE.map((l) =>
          l.children ? (
            <div key={l.label}>
              {/* หัวข้อที่กดกาง/หุบได้ */}
              <button
                onClick={() => setOpenSub(openSub === l.label ? null : l.label)}
                className="flex w-full items-center justify-between border-b border-white/[.06] px-[30px] py-[13px] text-left text-[15px] text-[var(--txt-d)]"
              >
                {l.label}
                <svg
                  className={`h-3.5 w-3.5 opacity-60 transition-transform ${openSub === l.label ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* เมนูย่อย: กางลงในแนวตั้ง ดันเนื้อหาข้างล่างลง */}
              {openSub === l.label && (
                <div className="bg-black/20">
                  {l.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-white/[.06] py-[11px] pl-[46px] pr-[30px] text-[14px] no-underline ${
                        isOn(c.href) ? 'text-[var(--red)]' : 'text-[var(--muted-d)]'
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-white/[.06] px-[30px] py-[13px] text-[15px] no-underline ${
                isOn(l.href) ? 'text-[var(--red)]' : 'text-[var(--txt-d)]'
              }`}
            >
              {l.label}
            </Link>
          )
        )}
      </div>
    </header>
  );
}