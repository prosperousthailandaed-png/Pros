-- ============================================================
-- IP-based login rate limiting (เสริมจาก email-based เดิม)
-- รันครั้งเดียวใน Supabase SQL Editor (ทั้ง dev และ production project)
-- ============================================================

create table if not exists public.admin_ip_attempts (
  ip text primary key,
  fail_count int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.admin_ip_attempts enable row level security;
-- ไม่เปิด policy select/insert ให้ client เลย เข้าถึงได้เฉพาะผ่าน service_role (เหมือน admin_login_attempts)