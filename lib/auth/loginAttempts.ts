// lib/auth/loginAttempts.ts
// จำกัดจำนวนครั้งล็อกอินผิด: ผิดครบ MAX_FAILS ครั้ง -> ล็อก LOCK_MINUTES นาที

import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

export async function checkLockout(
  email: string
): Promise<{ locked: boolean; minutesLeft?: number }> {
  const { data } = await supabaseAdmin
    .from('admin_login_attempts')
    .select('locked_until')
    .eq('email', email)
    .maybeSingle();

  if (data?.locked_until && new Date(data.locked_until) > new Date()) {
    const minutesLeft = Math.ceil(
      (new Date(data.locked_until).getTime() - Date.now()) / 60000
    );
    return { locked: true, minutesLeft };
  }
  return { locked: false };
}

export async function recordFailedAttempt(email: string) {
  const { data } = await supabaseAdmin
    .from('admin_login_attempts')
    .select('fail_count')
    .eq('email', email)
    .maybeSingle();

  const failCount = (data?.fail_count ?? 0) + 1;
  const lockedUntil =
    failCount >= MAX_FAILS
      ? new Date(Date.now() + LOCK_MINUTES * 60000).toISOString()
      : null;

  await supabaseAdmin.from('admin_login_attempts').upsert({
    email,
    fail_count: failCount,
    locked_until: lockedUntil,
    updated_at: new Date().toISOString(),
  });
}

export async function clearAttempts(email: string) {
  await supabaseAdmin.from('admin_login_attempts').delete().eq('email', email);
}