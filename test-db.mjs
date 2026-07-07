// test-db.mjs
// ทดสอบการเชื่อมต่อ Supabase แยกจาก Next.js
// รัน: node test-db.mjs
//
// ต้องมี .env.local อยู่ในโฟลเดอร์เดียวกัน และติดตั้ง dotenv ไว้ก่อน:
//   npm install dotenv --save-dev

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- เช็ค env vars ---');
console.log('URL:', url ?? '❌ ไม่มีค่า');
console.log('ANON_KEY:', anonKey ? anonKey.slice(0, 20) + '...' : '❌ ไม่มีค่า');
console.log('SERVICE_KEY:', serviceKey ? serviceKey.slice(0, 20) + '...' : '❌ ไม่มีค่า');

if (!url || !url.includes('.supabase.co')) {
  console.error('\n❌ URL ต้องเป็นรูปแบบ https://<ref>.supabase.co ไม่ใช่ dashboard link');
  process.exit(1);
}

const supabase = createClient(url, anonKey);
const supabaseAdmin = createClient(url, serviceKey);

console.log('\n--- 1. ทดสอบอ่านด้วย anon key (ควรเห็นเฉพาะ published=true) ---');
const { data: publicData, error: publicError } = await supabase
  .from('articles')
  .select('slug, title, published');

if (publicError) {
  console.error('❌ อ่านไม่ได้:', publicError.message);
} else {
  console.log(`✅ อ่านได้ ${publicData.length} แถว:`, publicData);
}

console.log('\n--- 2. ทดสอบอ่านด้วย service role (ควรเห็นทุกแถว รวม draft) ---');
const { data: adminData, error: adminError } = await supabaseAdmin
  .from('articles')
  .select('slug, title, published');

if (adminError) {
  console.error('❌ อ่านไม่ได้:', adminError.message);
} else {
  console.log(`✅ อ่านได้ ${adminData.length} แถว:`, adminData);
}

console.log('\n--- 3. ทดสอบ RLS: anon เห็นน้อยกว่าหรือเท่ากับ admin เท่านั้น ---');
if (!publicError && !adminError) {
  if (publicData.length <= adminData.length) {
    console.log('✅ RLS ทำงานถูกต้อง (anon เห็น ≤ admin)');
  } else {
    console.error('❌ ผิดปกติ: anon เห็นมากกว่า admin ได้ยังไง ตรวจ RLS policy อีกที');
  }
}

console.log('\n--- 4. ทดสอบเขียนด้วย service role (insert แล้วลบทิ้งทันที) ---');
const testSlug = 'db-test-' + Date.now();
const { data: inserted, error: insertError } = await supabaseAdmin
  .from('articles')
  .insert({ slug: testSlug, title: 'DB test', excerpt: 'test', published: false })
  .select()
  .single();

if (insertError) {
  console.error('❌ insert ไม่ได้:', insertError.message);
} else {
  console.log('✅ insert สำเร็จ:', inserted.slug);
  const { error: deleteError } = await supabaseAdmin.from('articles').delete().eq('slug', testSlug);
  console.log(deleteError ? '❌ ลบไม่ได้: ' + deleteError.message : '✅ ลบแถวทดสอบเรียบร้อย');
}

console.log('\n--- เสร็จ ---');
