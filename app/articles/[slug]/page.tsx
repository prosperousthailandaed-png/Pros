// app/articles/[slug]/page.tsx
// โครงหน้ารายละเอียดบทความ (เนื้อหาจริงใส่ทีหลังผ่าน lib/data/articles.ts
// หรือเปลี่ยนเป็น fetch จากระบบแอดมินเมื่อพร้อม)

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getAllArticleSlugs } from '@/lib/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Prosperous`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

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

      {/* ===== เนื้อหาบทความ ===== */}
      {/* TODO: ใส่ content[] จริงใน lib/data/articles.ts หรือดึงจากระบบแอดมิน */}
      <section className="sec">
        <div className="wrap narrow reveal article-body">
          {(article.content ?? ['รอเนื้อหาจริงจากระบบแอดมิน']).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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
            {articles
              .filter((a) => a.slug !== article.slug)
              .map((a) => (
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