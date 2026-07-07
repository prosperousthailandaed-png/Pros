// app/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createArticle, updateArticle, deleteArticle } from '@/lib/data/articles';
import { supabaseAdmin } from '@/lib/supabase/admin';

// แปลง textarea เป็น array พารากราฟ โดยแบ่งด้วยบรรทัดว่าง
function parseContent(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== 'string') return [];
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// อัปโหลดไฟล์รูปปก (ถ้ามีการเลือกไฟล์) ขึ้น bucket article-covers แล้วคืน public URL
async function uploadCoverIfProvided(formData: FormData): Promise<string | undefined> {
  const file = formData.get('cover_file');
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from('article-covers')
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error('อัปโหลดรูปไม่สำเร็จ: ' + error.message);

  const { data } = supabaseAdmin.storage.from('article-covers').getPublicUrl(path);
  return data.publicUrl;
}

export async function createArticleAction(formData: FormData) {
  const coverUrl = await uploadCoverIfProvided(formData);

  await createArticle({
    slug: String(formData.get('slug')).trim(),
    title: String(formData.get('title')).trim(),
    excerpt: String(formData.get('excerpt')).trim(),
    content: parseContent(formData.get('content')),
    cover_url: coverUrl,
    published: formData.get('published') === 'on',
  });

  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath('/');
  redirect('/admin');
}

export async function updateArticleAction(slug: string, formData: FormData) {
  const coverUrl = await uploadCoverIfProvided(formData);

  await updateArticle(slug, {
    title: String(formData.get('title')).trim(),
    excerpt: String(formData.get('excerpt')).trim(),
    content: parseContent(formData.get('content')),
    ...(coverUrl ? { cover_url: coverUrl } : {}),
    published: formData.get('published') === 'on',
  });

  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath(`/articles/${slug}`);
  revalidatePath('/');
  redirect('/admin');
}

export async function deleteArticleAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  await deleteArticle(slug);
  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath('/');
}