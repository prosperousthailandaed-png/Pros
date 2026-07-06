// lib/data/articles.ts
// ข้อมูลบทความ — ตอนนี้เป็น placeholder รอต่อกับระบบบทความในแอดมินจริงตามที่ระบุไว้ใน HomePage
// ("ดึงจากระบบบทความในแอดมินอัตโนมัติ") เมื่อพร้อมค่อยเปลี่ยนจาก array คงที่นี้
// เป็นการ fetch จาก CMS/DB แทน โดยคง interface Article เดิมไว้เพื่อไม่ต้องแก้หน้าอื่น

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;        // path รูปปก .avif — ถ้ายังไม่มีจะโชว์กล่อง placeholder แทน
  publishedAt?: string;  // เช่น "6 ก.ค. 2569"
  content?: string[];    // เนื้อหาแบบแบ่งพารากราฟ — ใส่จริงทีหลัง
}

export const articles: Article[] = [
  {
    slug: 'article-1',
    title: 'รอข้อมูลจริง — หัวข้อบทความ',
    excerpt: 'รอข้อมูลจริงจากระบบแอดมิน',
  },
  {
    slug: 'article-2',
    title: 'รอข้อมูลจริง — หัวข้อบทความ',
    excerpt: 'รอข้อมูลจริงจากระบบแอดมิน',
  },
  {
    slug: 'article-3',
    title: 'รอข้อมูลจริง — หัวข้อบทความ',
    excerpt: 'รอข้อมูลจริงจากระบบแอดมิน',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}