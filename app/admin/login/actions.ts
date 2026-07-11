// app/admin/login/actions.ts
// แทนที่ไฟล์เดิมทั้งหมด — เลิกใช้ระบบ ADMIN_PASSWORD cookie แล้ว
// เหลือทางเดียว: Supabase Auth (email/password) + จำกัดจำนวนครั้งล็อกอินผิด + audit log

'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { checkLockout, recordFailedAttempt, clearAttempts } from '@/lib/auth/loginAttempts';
import { logAudit } from '@/lib/supabase/audit';

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'กรุณากรอกอีเมลและรหัสผ่าน' };
  }

  const lockout = await checkLockout(email);
  if (lockout.locked) {
    return {
      error: `ล็อกอินผิดเกินกำหนด กรุณารออีก ${lockout.minutesLeft} นาที`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    await recordFailedAttempt(email);
    await logAudit({ actorEmail: email, action: 'login_failed' });
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }

  await clearAttempts(email);
  await logAudit({ actorEmail: email, action: 'login_success' });

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    await logAudit({ actorEmail: user.email, action: 'logout' });
  }

  await supabase.auth.signOut();
  redirect('/admin/login');
}