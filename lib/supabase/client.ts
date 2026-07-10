// lib/supabase/client.ts
// Client แบบ public — ใช้ anon key อ่านข้อมูลที่เปิดผ่าน RLS เท่านั้น
// ใช้ createBrowserClient จาก @supabase/ssr (ไม่ใช่ supabase-js ตรง ๆ)
// เพราะตัวนี้เขียน session ลง cookie ให้อัตโนมัติ — จำเป็นมาก เนื่องจาก
// middleware.ts และ lib/supabase/server.ts เช็ค login ผ่าน cookie เท่านั้น
// ถ้าใช้ supabase-js ตรง ๆ session จะถูกเก็บใน localStorage แทน ทำให้
// middleware มองไม่เห็นว่า login แล้ว และเด้งกลับหน้า login วนไม่รู้จบ

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'ขาด NEXT_PUBLIC_SUPABASE_URL หรือ NEXT_PUBLIC_SUPABASE_ANON_KEY ใน .env.local'
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);