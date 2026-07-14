insert into public.articles (slug, title, excerpt, content, published, published_at)
values (
  'cpr-basic-guide',
  'วิธีทำ CPR เบื้องต้นที่ทุกคนควรรู้',
  'ขั้นตอนการทำ CPR ฉบับเข้าใจง่าย สำหรับคนทั่วไปที่ไม่ใช่บุคลากรทางการแพทย์',
  '["ย่อหน้าที่ 1 เนื้อหาจริง...", "ย่อหน้าที่ 2 เนื้อหาจริง..."]'::jsonb,
  true,
  now()
);