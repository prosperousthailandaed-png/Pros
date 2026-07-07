import type { Metadata, Viewport } from "next";
import { Kanit, Anuphan } from "next/font/google";
import "./globals.css";
import Reveal from '@/components/Reveal';
import LayoutShell from "@/components/Layoutshell";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}



const anuphan = Anuphan({
   subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
});

const ibmPlex = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-anuphan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Prosperous Rescue Swimming",
  description: "ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${anuphan.variable} ${ibmPlex.variable}`}>
      <body>
        {/* Reveal ถูก import ไว้แต่ไม่เคยถูก render มาก่อน จึงไม่มีการ
            เพิ่มคลาส .reveal-ready ให้ <html> เลย ทำให้ Effect เลื่อนแล้ว
            ค่อย ๆ ปรากฏ (fade-up) ที่ตั้งใจไว้ใน CSS ไม่ทำงาน — เพิ่มไว้ตรงนี้ */}
        <Reveal />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}