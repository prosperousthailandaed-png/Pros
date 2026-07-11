// app/articles/[slug]/page.tsx
// หน้ารายละเอียดบทความ — ดึงข้อมูลจาก Supabase (public.articles, published = true)

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles, getArticleBySlug, getAllArticleSlugs } from '@/lib/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // วินาที

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Prosperous`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = await getArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug);

  return (
    <div className="article-detail">
      {/* ===== Hero / ปกบทความ ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          {article.cover ? (
            <img src={article.cover} alt={article.title} className="article-cover" />
          ) : (
            <div className="article-cover article-cover--ph">[ ปกบทความ ]</div>
          )}

          <p className="eyebrow tracking-normal">บทความ</p>
          <h1 className="tracking-normal">{article.title}</h1>
          {article.publishedAt && (
            <p className="article-meta">{article.publishedAt}</p>
          )}
        </div>
      </section>

      {/* ===== เนื้อหาบทความ (ย่อหน้า/รูป สลับกันตามลำดับที่แอดมินจัดไว้) ===== */}
      <section className="sec">
        <div className="wrap narrow reveal article-body">
          {article.content && article.content.length > 0 ? (
            article.content.map((block, i) =>
              block.type === 'image' ? (
                <figure key={i} className="article-inline-figure">
                  <img src={block.url} alt={block.caption ?? ''} />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )
          ) : (
            <p>รอเนื้อหาจริงจากระบบแอดมิน</p>
          )}
        </div>
      </section>

      {/* ===== กลับไปหน้ารวม ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <Link href="/articles" className="link-more">
            ← ดูบทความทั้งหมด
          </Link>
        </div>
      </section>

      {/* ===== บทความอื่น ๆ ===== */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">บทความอื่น ๆ</h2>
          </div>
          <div className="related-grid">
            {relatedArticles.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="ncard reveal">
                {a.cover ? (
                  <img src={a.cover} alt={a.title} className="pic" />
                ) : (
                  <div className="pic img-ph">[ ปกบทความ ]</div>
                )}
                <div className="nbody">
                  <h4
                    className="ph"
                    style={{ border: 'none', padding: 0, color: 'var(--red)' }}
                  >
                    {a.title}
                  </h4>
                  <div className="foot">
                    <span className="link-more">อ่านเพิ่มเติม →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}