// app/admin/[slug]/edit/page.tsx
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { updateArticleAction } from '../../actions';
import ArticleContentEditor from '@/components/admin/ArticleContentEditor';
import type { ContentBlock } from '@/lib/data/articles';

export const metadata = { title: 'แก้ไขบทความ | Admin' };

interface PageProps {
  params: Promise<{ slug: string }>;
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: 8,
  marginTop: 4,
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 15,
};

export default async function EditArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: article } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!article) notFound();

  // ผูก slug เข้ากับ server action ล่วงหน้า เพราะ updateArticleAction ต้องการ slug + formData
  const updateWithSlug = updateArticleAction.bind(null, slug);
  const initialBlocks: ContentBlock[] = article.content_blocks ?? [];

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8, fontSize: 24 }}>แก้ไขบทความ</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>slug: {article.slug} (แก้ไขไม่ได้หลังสร้าง)</p>

      <form
        action={updateWithSlug}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <label>
          ชื่อบทความ
          <input name="title" defaultValue={article.title} required style={inputStyle} />
        </label>
        <label>
          บทคัดย่อ
          <textarea
            name="excerpt"
            defaultValue={article.excerpt}
            required
            rows={2}
            style={inputStyle}
          />
        </label>

        <div>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>เนื้อหา</p>
          <p style={{ marginBottom: 8, fontSize: 13, color: '#888' }}>
            เพิ่มย่อหน้าและรูปภาพสลับกันได้ตามลำดับที่ต้องการ ใช้ปุ่ม ↑ ↓ จัดลำดับ
          </p>
          <ArticleContentEditor initialBlocks={initialBlocks} />
        </div>

        {article.cover_url && (
          <div>
            <p style={{ marginBottom: 8 }}>รูปปกปัจจุบัน:</p>
            <img
              src={article.cover_url}
              alt=""
              style={{ maxWidth: 200, borderRadius: 8, display: 'block' }}
            />
          </div>
        )}
        <label>
          เปลี่ยนรูปปก (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)
          <input type="file" name="cover_file" accept="image/*" style={{ marginTop: 4 }} />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="published" defaultChecked={article.published} />{' '}
          เผยแพร่
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: 10, cursor: 'pointer' }}
        >
          บันทึก
        </button>
      </form>
    </div>
  );
}