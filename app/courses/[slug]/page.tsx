// app/courses/[slug]/page.tsx
// โครงหน้ารายละเอียดหลักสูตร (เนื้อหาจริงใส่ทีหลังผ่าน lib/data/courses.ts)
// ใช้ class ที่มีอยู่แล้ว (.sec, .sub, .mist, .finale, .btn, .btn-primary, .en, .ccard ฯลฯ)
// แกลเลอรี: course.gallery?[] — กล่องเดียว โชว์ทีละรูป เลื่อนด้วยปุ่มลูกศร (components/CourseGallery.tsx)

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses, getCourseBySlug, getAllCourseSlugs } from '@/lib/data/courses';
import CourseGallery from '@/components/CourseGallery';

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

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const hasGalleryImages = (course.gallery?.length ?? 0) > 0;

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
              <span className="course-meta__value">
              {course.certification ?? 'ได้รับประกาศนียบัตร'}
              </span>
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

      {/* ===== ภาพบรรยากาศการอบรม — กล่องเดียว เลื่อนด้วยปุ่มลูกศร =====
          แสดงเฉพาะตอนมีรูปจริงอย่างน้อย 1 รูป — ไม่มีรูปเลยจะข้าม section นี้ไป */}
      {hasGalleryImages && (
        <section className="sec">
          <div className="wrap narrow reveal">
            <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
            <CourseGallery images={course.gallery!} title={course.title} />
          </div>
        </section>
      )}

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