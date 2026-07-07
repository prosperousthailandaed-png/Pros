// app/courses/[slug]/page.tsx
// โครงหน้ารายละเอียดหลักสูตร (เนื้อหาจริงใส่ทีหลังผ่าน lib/data/courses.ts)
// ใช้ class ที่มีอยู่แล้ว (.sec, .sub, .mist, .finale, .btn, .btn-primary, .en, .ccard ฯลฯ)
// ส่วน UI ใหม่ใช้ prefix .course-* ทั้งหมด (hero / meta / split / steps / gallery / check)
// รูปภาพ: จุดเด่นใช้ course.image, แกลเลอรีใช้ course.gallery?[] (ถ้าไม่มีจะแสดง placeholder)

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses, getCourseBySlug, getAllCourseSlugs } from '@/lib/data/courses';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | Prosperous`,
    description: course.description,
  };
}

// placeholder ตอนยังไม่มีรูปจริงในแกลเลอรี
function GalleryPlaceholder() {
  return (
    <div className="course-gallery__placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>ภาพบรรยากาศการอบรม</span>
    </div>
  );
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  // แกลเลอรี 3 ช่องเสมอ — เติม placeholder ถ้ารูปจริงยังไม่ครบ
  const gallery: (string | null)[] = [
    ...(course.gallery ?? []),
    null,
    null,
    null,
  ].slice(0, 3);

  return (
    <div className="course-detail">
      {/* ===== Hero ===== */}
      <section className="course-hero">
        <img src={course.image} alt={course.title} className="course-hero__img" />
        <div className="course-hero__overlay" />
        <div className="wrap narrow course-hero__content reveal">
          <div className="en">{course.category}</div>
          <h1>{course.title}</h1>
          <p className="sub">{course.description}</p>
        </div>
      </section>

      {/* ===== ระยะเวลา / ระดับ / ประกาศนียบัตร ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <div className="course-meta">
            <div>
              <span className="course-meta__label">ระยะเวลาอบรม</span>
              <span className="course-meta__value">
                {course.duration ?? 'รอเพิ่มเติมข้อมูล'}
              </span>
            </div>
            <div>
              <span className="course-meta__label">ระดับผู้เข้าอบรม</span>
              <span className="course-meta__value">
                {course.level ?? 'รอเพิ่มเติมข้อมูล'}
              </span>
            </div>
            <div>
              <span className="course-meta__label">เมื่อจบหลักสูตร</span>
              <span className="course-meta__value">ได้รับประกาศนียบัตร</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร — ลิสต์ซ้าย รูปขวา ===== */}
      <section className="sec">
        <div className="wrap reveal">
          <div className="course-split">
            <div className="course-split__text">
              <h2 className="sec">จุดเด่นของหลักสูตร</h2>
              <ul className="course-list">
                {(course.highlights ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="course-split__media">
              <img src={course.image} alt={course.title} />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก — ลำดับตัวเลข 01 02 03 ===== */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ol className="course-steps">
            {(course.curriculum ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
              <li key={i}>
                <span className="course-steps__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="course-steps__text">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ภาพบรรยากาศการอบรม ===== */}
      {/* TODO: เพิ่ม gallery: string[] ใน lib/data/courses.ts เมื่อมีรูปจริง */}
      <section className="sec">
        <div className="wrap reveal">
          <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
          <div className="course-gallery">
            {gallery.map((src, i) => (
              <div key={i} className="course-gallery__item">
                {src ? (
                  <img src={src} alt={`${course.title} — ภาพที่ ${i + 1}`} />
                ) : (
                  <GalleryPlaceholder />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม — checklist ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="course-check">
            {(course.audience ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CTA สมัครอบรม ===== */}
      <section className="finale">
        <div className="narrow reveal">
          <h2>สนใจสมัครอบรมหลักสูตรนี้?</h2>
          <div className="ctas">
            <Link href="/contact" className="btn btn-primary">
              ติดต่อสอบถาม / สมัครอบรม
            </Link>
          </div>
        </div>
      </section>

      {/* ===== หลักสูตรอื่น ๆ ===== */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">หลักสูตรอื่น ๆ</h2>
          </div>
          <div className="related-grid">
            {courses
              .filter((c) => c.slug !== course.slug)
              .map((c) => (
                <Link key={c.slug} href={`/courses/${c.slug}`} className="ccard reveal">
                  <img src={c.image} alt={c.title} />
                  <div className="cbody">
                    <h4>{c.title}</h4>
                    <div className="en">{c.category}</div>
                    <div className="foot">
                      <span className="link-more">ดูเพิ่มเติม →</span>
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