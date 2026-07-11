// lib/supabase/audit.ts
// บันทึกประวัติการเข้าใช้งาน/แก้ไขข้อมูลของแอดมิน

import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function logAudit(params: {
  actorEmail: string;
  action: string;
  targetTable?: string;
  targetId?: string;
  detail?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin.from('admin_audit_log').insert({
    actor_email: params.actorEmail,
    action: params.action,
    target_table: params.targetTable,
    target_id: params.targetId,
    detail: params.detail ?? null,
  });

  if (error) console.error('logAudit error:', error.message);
}