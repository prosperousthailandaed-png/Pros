-- conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null default 'ลูกค้า',
  customer_contact text,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

-- messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer', 'admin')),
  content text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_messages_conversation on messages(conversation_id, created_at);

create or replace function update_conversation_last_message()
returns trigger as $$
begin
  update conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql;

create trigger trg_update_last_message
after insert on messages
for each row execute function update_conversation_last_message();

alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table conversations;

alter table conversations enable row level security;
alter table messages enable row level security;

create policy "public can create conversation" on conversations
  for insert to anon with check (true);

create policy "public can read own conversation" on conversations
  for select to anon using (true);

create policy "public can insert message" on messages
  for insert to anon with check (sender_type = 'customer');

create policy "public can read messages" on messages
  for select to anon using (true);

create policy "admin full access conversations" on conversations
  for all to authenticated using (true) with check (true);

create policy "admin full access messages" on messages
  for all to authenticated using (true) with check (true);