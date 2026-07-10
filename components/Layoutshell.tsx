"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HIDE_CHROME_PATHS = ["/products/aed"];

// เส้นทางที่ขึ้นต้นด้วยพวกนี้ ให้ซ่อน Navbar/Footer ทั้งหมด (ไม่ต้องแจกแจง
// ทีละหน้าเหมือน HIDE_CHROME_PATHS เพราะ /admin มีหน้าย่อยเพิ่มได้เรื่อย ๆ
// เช่น /admin/login, /admin/chat, /admin/articles/new ในอนาคต)
const HIDE_CHROME_PREFIXES = ["/admin"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    HIDE_CHROME_PATHS.includes(pathname) ||
    HIDE_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}