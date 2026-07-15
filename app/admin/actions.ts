// app/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createArticle, updateArticle, deleteArticle, type ContentBlock } from '@/lib/data/articles';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireLoggedIn, requireAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/supabase/audit';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// เช็ก magic bytes ของไฟล์จริง แทนการเชื่อ file.type ที่ client ส่งมาอย่างเดียว
async function validateImageFile(file: File): Promise<string | null> {
  if (file.size > MAX_IMAGE_SIZE) {
    return 'ไฟล์ใหญ่เกินไป (จำกัด 5MB)';
  }

  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  const isJpeg = header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
  const isPng =
    header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47;
  const isGif =
    header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38;
  const isWebp =
    header[0] === 0x52 &&
    header[1] === 0x49 &&
    header[2] === 0x46 &&
    header[3] === 0x46 &&
    header[8] === 0x57 &&
    header[9] === 0x45 &&
    header[10] === 0x42 &&
    header[11] === 0x50;

  const brand = String.fromCharCode(header[8], header[9], header[10], header[11]);
  const isAvif =
    header[4] === 0x66 &&
    header[5] === 0x74 &&
    header[6] === 0x79 &&
    header[7] === 0x70 &&
    ['avif', 'avis', 'mif1'].includes(brand);

  if (!(isJpeg || isPng || isGif || isWebp || isAvif)) {
    return 'ไฟล์ต้องเป็นรูปภาพ (jpg, png, gif, webp, avif) เท่านั้น';
  }
  return null;
}

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

  const invalidReason = await validateImageFile(file);
  if (invalidReason) throw new Error(invalidReason);

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

  const invalidReason = await validateImageFile(file);
  if (invalidReason) return { error: invalidReason };

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

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
  redirect('/admin/articles');
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

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath(`/articles/${slug}`);
  revalidatePath('/');
  redirect('/admin/articles');
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

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
}