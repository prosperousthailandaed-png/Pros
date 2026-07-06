// app/courses/[slug]/page.tsx
// โครงหน้ารายละเอียดหลักสูตร (เนื้อหาจริงใส่ทีหลังผ่าน lib/data/courses.ts)
// ใช้ class ที่มีอยู่แล้ว (.sec, .sub, .mist, .finale, .btn, .btn-primary, .en, .cgrid, .ccard ฯลฯ)
// ส่วนที่เป็น UI ใหม่ (hero / meta / list) ใช้ class .course-hero / .course-meta / .course-list
// ซึ่งอยู่ใน styles/course-detail.css แยกต่างหาก

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

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

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

      {/* ===== ระยะเวลา / ระดับ ===== */}
      {/* TODO: ใส่ duration / level จริงใน lib/data/courses.ts */}
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
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร ===== */}
      {/* TODO: ใส่ highlights[] จริงใน lib/data/courses.ts */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">จุดเด่นของหลักสูตร</h2>
          <ul className="course-list">
            {(course.highlights ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก ===== */}
      {/* TODO: ใส่ curriculum[] จริงใน lib/data/courses.ts */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ul className="course-list">
            {(course.curriculum ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม ===== */}
      {/* TODO: ใส่ audience[] จริงใน lib/data/courses.ts */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="course-list">
            {(course.audience ?? ['รอเพิ่มเติมเนื้อหา']).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CTA สมัครอบรม ===== */}
      {/* TODO: เปลี่ยน href เป็นฟอร์มสมัคร/เบอร์ติดต่อจริง */}
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