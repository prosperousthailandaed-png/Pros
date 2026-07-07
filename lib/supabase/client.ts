// lib/supabase/client.ts
// Client แบบ public — ใช้ anon key อ่านข้อมูลที่เปิดผ่าน RLS เท่านั้น
// ใช้ได้ทั้งใน Server Component และ Client Component

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'ขาด NEXT_PUBLIC_SUPABASE_URL หรือ NEXT_PUBLIC_SUPABASE_ANON_KEY ใน .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);