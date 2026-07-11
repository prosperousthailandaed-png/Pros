// lib/data/articles.ts
// ดึงข้อมูลบทความจาก Supabase (ตาราง public.articles)
// เนื้อหาบทความเก็บเป็น content_blocks (jsonb): array ของ paragraph/image สลับกันได้

import { supabase } from '@/lib/supabase/client';

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; caption?: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;         // URL รูปปกจาก Supabase Storage
  publishedAt?: string;   // เช่น "6 ก.ค. 2569"
  content?: ContentBlock[];
}

function mapRow(row: {
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  published_at: string | null;
  content_blocks: ContentBlock[] | null;
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
    content:
      row.content_blocks && row.content_blocks.length > 0
        ? row.content_blocks
        : undefined,
  };
}

// ---------- ฝั่งสาธารณะ (ใช้ในหน้าเว็บ) ----------

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, excerpt, cover_url, published_at, content_blocks')
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
    .select('slug, title, excerpt, cover_url, published_at, content_blocks')
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

export interface ArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  content?: ContentBlock[];
  cover_url?: string;
  published?: boolean;
}

export async function createArticle(input: ArticleInput) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const { content, ...rest } = input;
  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert({
      ...rest,
      content_blocks: content ?? [],
      published_at: input.published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateArticle(slug: string, input: Partial<ArticleInput>) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const { content, ...rest } = input;
  const patch: Record<string, unknown> = { ...rest };

  if (content) {
    patch.content_blocks = content;
  }

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