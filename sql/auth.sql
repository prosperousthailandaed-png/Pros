-- ตาราง profiles: เก็บ role ของผู้ใช้แอดมิน
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- ผู้ใช้ที่มีอยู่แล้วทั้งหมด ตั้งเป็น admin ก่อน (ทีหลังไปแก้ role รายคนได้ในตารางนี้)
insert into public.profiles (id, email, role)
select id, email, 'admin' from auth.users
on conflict (id) do nothing;

-- ผู้ใช้ใหม่ที่ถูกสร้างใน auth.users ให้มี profile อัตโนมัติ (default = editor)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

-- ตารางนับล็อกอินผิด (rate limit)
create table if not exists public.admin_login_attempts (
  email text primary key,
  fail_count int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.admin_login_attempts enable row level security;
-- ไม่เปิด policy select/insert ให้ client เลย เข้าถึงได้เฉพาะผ่าน service_role

-- ตาราง audit log
create table if not exists public.admin_audit_log (
  id bigserial primary key,
  actor_email text,
  action text not null,
  target_table text,
  target_id text,
  detail jsonb,
  created_at timestamptz not null default now()
);
alter table public.admin_audit_log enable row level security;

create policy "audit log: admin read" on public.admin_audit_log
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );