-- ============================================================
-- Prosperous — Articles schema for Supabase
-- รันไฟล์นี้ใน Supabase Dashboard > SQL Editor (ครั้งเดียว)
-- ============================================================

create extension if not exists "pgcrypto"; -- สำหรับ gen_random_uuid()

-- ---------- ตาราง articles ----------
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null default '',
  content       jsonb not null default '[]'::jsonb,  -- array ของพารากราฟ เช่น ["ย่อหน้า 1", "ย่อหน้า 2"]
  cover_url     text,                                  -- URL รูปปกจาก Supabase Storage
  published     boolean not null default false,        -- true = แสดงหน้าเว็บ, false = draft ในแอดมิน
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_published_idx
  on public.articles (published, published_at desc);

-- ---------- auto-update updated_at ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
alter table public.articles enable row level security;

-- คนทั่วไป (anon key) อ่านได้เฉพาะบทความที่ published = true
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles for select
  using (published = true);

-- หมายเหตุ: การเขียน (insert/update/delete) จากแอดมิน ให้ใช้ service_role key
-- ฝั่ง server เท่านั้น (service_role bypass RLS โดยอัตโนมัติ ไม่ต้องเปิด policy เพิ่ม)
-- ถ้าจะให้แอดมิน login ผ่าน Supabase Auth แล้วเขียนตรงจาก client แทน ค่อยเพิ่ม policy
-- แบบ `using (auth.role() = 'authenticated')` ทีหลังได้

-- ---------- Storage bucket สำหรับรูปปกบทความ ----------
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

drop policy if exists "Public read article covers" on storage.objects;
create policy "Public read article covers"
  on storage.objects for select
  using (bucket_id = 'article-covers');

-- อัปโหลดรูปจากแอดมินให้ทำผ่าน service_role key ฝั่ง server เช่นกัน