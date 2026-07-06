// app/articles/page.tsx
// หน้ารวมบทความ — ใช้ class เดียวกับ section ข่าวสารใน HomePage
// (.ngrid / .ncard / .nbody / .pic / .img-ph / .foot / .link-more มีอยู่แล้วใน globals.css)

import Link from 'next/link';
import { articles } from '@/lib/data/articles';

export const metadata = {
  title: 'ข่าวสาร & ความรู้ | Prosperous',
  description: 'บทความและความรู้ด้านการช่วยชีวิต CPR AED และการกู้ภัยจากโพรสเพอรัส',
};

export default function ArticlesPage() {
  return (
    <div className="articles-page">
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">ข่าวสาร &amp; ความรู้</h2>
            <p className="sub">ดึงจากระบบบทความในแอดมินอัตโนมัติ</p>
          </div>

          <div className="ngrid">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="ncard reveal"
              >
                {article.cover ? (
                  <img src={article.cover} alt={article.title} className="pic" />
                ) : (
                  <div className="pic img-ph">[ ปกบทความ ]</div>
                )}
                <div className="nbody">
                  <h4
                    className="ph"
                    style={{ border: 'none', padding: 0, color: 'var(--red)' }}
                  >
                    {article.title}
                  </h4>
                  <p>{article.excerpt}</p>
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