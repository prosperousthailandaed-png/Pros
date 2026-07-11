// lib/auth/session.ts
// helper อ่าน user + role ปัจจุบันฝั่ง server (ใช้ในหน้า admin / server actions)

import 'server-only';
import { createClient } from '@/lib/supabase/server';

export type AdminRole = 'admin' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? '',
    role: (profile?.role as AdminRole) ?? 'editor',
  };
}

// ใช้ในจุดที่ต้องล็อกอินอยู่ก่อน (create/edit บทความ) — ไม่ได้ล็อกอินจะโยน error
export async function requireLoggedIn(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) throw new Error('กรุณาเข้าสู่ระบบก่อน');
  return user;
}

// ใช้ในจุดที่ต้องเป็น admin เท่านั้น (เช่น ลบบทความ, จัดการผู้ใช้)
export async function requireAdmin(): Promise<AdminUser> {
  const user = await requireLoggedIn();
  if (user.role !== 'admin') {
    throw new Error('ต้องเป็นผู้ดูแลระบบ (admin) เท่านั้นถึงจะทำรายการนี้ได้');
  }
  return user;
}