// lib/data/articles.ts
// ดึงข้อมูลบทความจาก Supabase (ตาราง public.articles)
// interface Article คงเดิมไว้ เพื่อไม่ต้องแก้หน้าอื่นที่ import ไปใช้

import { supabase } from '@/lib/supabase/client';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;        // URL รูปปกจาก Supabase Storage
  publishedAt?: string;  // เช่น "6 ก.ค. 2569"
  content?: string[];    // เนื้อหาแบบแบ่งพารากราฟ
}

// แปลง row จาก Supabase ให้เป็นรูปแบบ Article ที่หน้าเว็บใช้อยู่เดิม
function mapRow(row: {
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  published_at: string | null;
  content: string[] | null;
}): Article {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    cover: row.cover_url ?? undefined,
    publishedAt: row.published_at
      ? new Date(row.published_at).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : undefined,
    content: row.content && row.content.length > 0 ? row.content : undefined,
  };
}

// ---------- ฝั่งสาธารณะ (ใช้ในหน้าเว็บ) ----------

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, excerpt, cover_url, published_at, content')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('getArticles error:', error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, excerpt, cover_url, published_at, content')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data);
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('getAllArticleSlugs error:', error.message);
    return [];
  }
  return (data ?? []).map((r) => r.slug);
}

// ---------- ฝั่งแอดมิน (ใช้ supabaseAdmin ใน Server Action / Route Handler เท่านั้น) ----------
// ตัวอย่างการใช้งาน:
//
// 'use server';
// import { supabaseAdmin } from '@/lib/supabase/admin';
// import { createArticle } from '@/lib/data/articles';
//
// export async function createArticleAction(formData: FormData) { ... }

export interface ArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  content?: string[];
  cover_url?: string;
  published?: boolean;
}

export async function createArticle(input: ArticleInput) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert({
      ...input,
      published_at: input.published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateArticle(slug: string, input: Partial<ArticleInput>) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const patch: Record<string, unknown> = { ...input };

  // ถ้าเปลี่ยนเป็น published ครั้งแรก ให้ประทับ published_at อัตโนมัติ
  if (input.published) {
    patch.published_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin
    .from('articles')
    .update(patch)
    .eq('slug', slug)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteArticle(slug: string) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const { error } = await supabaseAdmin.from('articles').delete().eq('slug', slug);
  if (error) throw new Error(error.message);
}