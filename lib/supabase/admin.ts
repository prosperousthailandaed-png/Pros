// lib/supabase/admin.ts
// Client สิทธิ์สูง (service_role) — ใช้ได้เฉพาะฝั่ง server เท่านั้น
// (Server Actions, Route Handlers, หน้าแอดมินที่เป็น server component)
// ห้าม import ไฟล์นี้เข้าไปใน Client Component หรือ bundle ฝั่ง browser เด็ดขาด
// เพราะ service_role key เปิดสิทธิ์เขียน/อ่านทุกอย่าง ข้าม RLS ทั้งหมด

import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'ขาด NEXT_PUBLIC_SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY ใน .env.local'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});