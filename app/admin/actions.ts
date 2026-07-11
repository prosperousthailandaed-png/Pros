// app/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createArticle, updateArticle, deleteArticle, type ContentBlock } from '@/lib/data/articles';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireLoggedIn, requireAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/supabase/audit';

// อ่าน content_blocks_json (มาจาก ArticleContentEditor) แล้วตรวจรูปแบบคร่าวๆ ก่อนบันทึก
function parseContentBlocks(raw: FormDataEntryValue | null): ContentBlock[] {
  if (typeof raw !== 'string' || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b): b is ContentBlock =>
        b &&
        ((b.type === 'paragraph' && typeof b.text === 'string' && b.text.trim() !== '') ||
          (b.type === 'image' && typeof b.url === 'string' && b.url.trim() !== ''))
    );
  } catch {
    return [];
  }
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

// อัปโหลดรูปที่แทรกในเนื้อหาบทความ (เรียกจาก ArticleContentEditor ตอนเลือกไฟล์)
// ใช้ bucket article-covers เดิม ไม่ต้องสร้าง bucket ใหม่
export async function uploadArticleImageAction(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  try {
    await requireLoggedIn();
  } catch {
    return { error: 'กรุณาเข้าสู่ระบบก่อน' };
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'ไม่พบไฟล์' };
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const path = `content-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from('article-covers')
    .upload(path, file, { contentType: file.type });

  if (error) return { error: error.message };

  const { data } = supabaseAdmin.storage.from('article-covers').getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function createArticleAction(formData: FormData) {
  const user = await requireLoggedIn();

  const coverUrl = await uploadCoverIfProvided(formData);
  const slug = String(formData.get('slug')).trim();

  await createArticle({
    slug,
    title: String(formData.get('title')).trim(),
    excerpt: String(formData.get('excerpt')).trim(),
    content: parseContentBlocks(formData.get('content_blocks_json')),
    cover_url: coverUrl,
    published: formData.get('published') === 'on',
  });

  await logAudit({
    actorEmail: user.email,
    action: 'create_article',
    targetTable: 'articles',
    targetId: slug,
  });

  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath('/');
  redirect('/admin');
}

export async function updateArticleAction(slug: string, formData: FormData) {
  const user = await requireLoggedIn();

  const coverUrl = await uploadCoverIfProvided(formData);

  await updateArticle(slug, {
    title: String(formData.get('title')).trim(),
    excerpt: String(formData.get('excerpt')).trim(),
    content: parseContentBlocks(formData.get('content_blocks_json')),
    ...(coverUrl ? { cover_url: coverUrl } : {}),
    published: formData.get('published') === 'on',
  });

  await logAudit({
    actorEmail: user.email,
    action: 'update_article',
    targetTable: 'articles',
    targetId: slug,
  });

  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath(`/articles/${slug}`);
  revalidatePath('/');
  redirect('/admin');
}

export async function deleteArticleAction(formData: FormData) {
  const user = await requireAdmin(); // ลบได้เฉพาะ role admin เท่านั้น

  const slug = String(formData.get('slug'));
  await deleteArticle(slug);

  await logAudit({
    actorEmail: user.email,
    action: 'delete_article',
    targetTable: 'articles',
    targetId: slug,
  });

  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath('/');
}