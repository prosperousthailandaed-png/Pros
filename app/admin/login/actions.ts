// app/admin/login/actions.ts
// Supabase Auth (email/password) + จำกัดจำนวนครั้งล็อกอินผิดตามอีเมลและตาม IP + audit log

'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  checkLockout,
  recordFailedAttempt,
  clearAttempts,
  checkIpLockout,
  recordIpFailedAttempt,
  clearIpAttempts,
} from '@/lib/auth/loginAttempts';
import { logAudit } from '@/lib/supabase/audit';

export interface LoginState {
  error?: string;
}

function getClientIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headersList.get('x-real-ip') ?? 'unknown';
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

  const headersList = await headers();
  const ip = getClientIp(headersList);

  const [emailLockout, ipLockout] = await Promise.all([checkLockout(email), checkIpLockout(ip)]);

  if (emailLockout.locked) {
    return { error: `ล็อกอินผิดเกินกำหนด กรุณารออีก ${emailLockout.minutesLeft} นาที` };
  }
  if (ipLockout.locked) {
    return { error: `มีการล็อกอินผิดจากเครือข่ายนี้บ่อยเกินไป กรุณารออีก ${ipLockout.minutesLeft} นาที` };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    await Promise.all([recordFailedAttempt(email), recordIpFailedAttempt(ip)]);
    await logAudit({ actorEmail: email, action: 'login_failed' });
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }

  await Promise.all([clearAttempts(email), clearIpAttempts(ip)]);
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