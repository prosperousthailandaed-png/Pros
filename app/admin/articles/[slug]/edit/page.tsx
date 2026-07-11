// app/admin/articles/[slug]/edit/page.tsx
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { updateArticleAction } from '../../../actions';
import ArticleFormEditor from '@/components/admin/ArticleContentEditor';
import type { ContentBlock } from '@/lib/data/articles';

export const metadata = { title: 'แก้ไขบทความ | Admin' };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: article } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!article) notFound();

  const updateWithSlug = updateArticleAction.bind(null, slug);
  const initialBlocks: ContentBlock[] = article.content_blocks ?? [];

  return (
    <div style={{ maxWidth: 860, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8, fontSize: 24 }}>แก้ไขบทความ</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>slug: {article.slug} (แก้ไขไม่ได้หลังสร้าง)</p>

      <form
        action={updateWithSlug}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <ArticleFormEditor
          initialTitle={article.title}
          initialExcerpt={article.excerpt}
          initialCoverUrl={article.cover_url ?? undefined}
          initialBlocks={initialBlocks}
          initialPublished={article.published}
        />

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