// app/courses/page.tsx
// หน้ารวมหลักสูตรฝึกอบรมทั้งหมด — ใช้ class เดียวกับ section #courses ใน HomePage
// (.cgrid / .ccard / .cbody / .en / .foot / .link-more มีอยู่แล้วใน globals.css)

import Link from 'next/link';
import { courses } from '@/lib/data/courses';

export const metadata = {
  title: 'หลักสูตรฝึกอบรม | Prosperous',
  description:
    'หลักสูตรการช่วยชีวิตขั้นพื้นฐาน Hard Association และการกู้ภัยทางน้ำ ทักษะที่ใช้ได้จริงในสภาวะวิกฤติ แม้คุณจะไม่ใช่นักกู้ภัย',
};

export default function CoursesPage() {
  return (
    <div className="courses-page">
      <section className="mist" id="courses">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">หลักสูตรฝึกอบรมของเรา</h2>
            <p className="sub">
              หลักสูตรการช่วยชีวิตขั้นพื้นฐาน Hard Association และการกู้ภัยทางน้ำ
              ทักษะที่ใช้ได้จริงในสภาวะวิกฤติ แม้คุณจะไม่ใช่นักกู้ภัย
            </p>
          </div>

          <div className="cgrid">
            {courses.map((course, i) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="ccard reveal"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="cbody">
                  <h4>{course.title}</h4>
                  <div className="en">{course.category}</div>
                  <p>{course.description}</p>
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