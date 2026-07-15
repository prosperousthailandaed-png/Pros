-- ============================================================
-- Security fixes: chat RLS ผูกกับเจ้าของจริง, staff-only admin access, กันสแปม
-- ต้องเปิด Authentication > Sign In / Providers > Anonymous ก่อนรันไฟล์นี้
-- ============================================================

-- 1) อย่าสร้าง profile (สิทธิ์ทีมงาน) ให้ session ลูกค้าแบบ anonymous โดยอัตโนมัติ
create or replace function public.handle_new_user()
returns trigger as $$
begin
  if new.is_anonymous then
    return new;
  end if;

  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- 2) helper เช็คว่า user ปัจจุบันเป็นทีมงาน (admin/editor) หรือไม่
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role in ('admin', 'editor')
  );
$$;

-- 3) ผูกบทสนทนากับ anonymous session ของลูกค้า
alter table public.conversations
  add column if not exists customer_user_id uuid references auth.users(id);

-- 4) ลบ policy เดิมที่เปิดอ่าน/เขียนแบบไม่จำกัดให้ anon
drop policy if exists "public can create conversation" on conversations;
drop policy if exists "public can read own conversation" on conversations;
drop policy if exists "public can insert message" on messages;
drop policy if exists "public can read messages" on messages;
drop policy if exists "admin full access conversations" on conversations;
drop policy if exists "admin full access messages" on messages;

-- 5) policy ใหม่: conversations
create policy "customer can create own conversation" on conversations
  for insert to authenticated
  with check (customer_user_id = auth.uid());

create policy "customer can read own conversation" on conversations
  for select to authenticated
  using (customer_user_id = auth.uid());

create policy "staff full access conversations" on conversations
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 6) policy ใหม่: messages
create policy "customer can insert own message" on messages
  for insert to authenticated
  with check (
    sender_type = 'customer'
    and exists (
      select 1 from conversations c
      where c.id = messages.conversation_id
        and c.customer_user_id = auth.uid()
    )
  );

create policy "customer can read own messages" on messages
  for select to authenticated
  using (
    exists (
      select 1 from conversations c
      where c.id = messages.conversation_id
        and c.customer_user_id = auth.uid()
    )
  );

create policy "staff full access messages" on messages
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- 7) กันข้อความยาวเกินที่ระดับ DB
alter table public.messages
  add constraint messages_content_length check (char_length(content) <= 500);

-- 8) กันสแปมส่งรัว ๆ ที่ระดับ DB (ลูกค้าส่งได้ไม่เกิน 1 ข้อความ/1.5 วิ ต่อบทสนทนา)
create or replace function public.enforce_chat_rate_limit()
returns trigger as $$
declare
  recent_count int;
begin
  if new.sender_type = 'customer' then
    select count(*) into recent_count
    from public.messages
    where conversation_id = new.conversation_id
      and sender_type = 'customer'
      and created_at > now() - interval '1.5 seconds';

    if recent_count > 0 then
      raise exception 'ส่งข้อความเร็วเกินไป กรุณารอสักครู่';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_chat_rate_limit on public.messages;
create trigger trg_chat_rate_limit
  before insert on public.messages
  for each row execute function public.enforce_chat_rate_limit();