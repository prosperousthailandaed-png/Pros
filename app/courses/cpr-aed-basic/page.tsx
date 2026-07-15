// app/courses/cpr-aed-basic/page.tsx
// หน้าหลักสูตร "หลักสูตรการช่วยชีวิตขั้นพื้นฐาน" — standalone แยกจากหลักสูตรอื่นทั้งหมด
// แก้โครงสร้าง/เนื้อหาของไฟล์นี้ได้อิสระ ไม่กระทบหลักสูตรอื่นอีก 3 หลักสูตร
// CSS เฉพาะหน้านี้อยู่ใน globals.css ภายใต้ prefix .crs-cpr-*
// (คลาสที่ยังใช้ร่วมกับหน้าอื่น: .wrap/.narrow/.sec/.mist/.finale/.btn/.en/.ccard/.cbody/.foot
//  /.link-more/.related-grid/.course-detail/.course-gallery* — ของเหล่านี้ "ไม่ได้" ถูกแยกเฉพาะหน้า)

import Link from 'next/link';
import { courses } from '@/lib/data/courses';
import CourseGallery from '@/components/CourseGallery';

export const metadata = {
  title: 'หลักสูตรการช่วยชีวิตขั้นพื้นฐาน | Prosperous',
  description: 'หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง AED',
};

const GALLERY_IMAGES = ["/image/csr/cpr.avif", "/image/csr/csr.avif"];
const HIGHLIGHTS = ["สอนตามมาตรฐาน American Heart Association (AHA)", "ฝึกปฏิบัติจริงกับหุ่นจำลอง CPR และเครื่อง AED", "วิทยากรมีประสบการณ์ตรงด้านการกู้ชีพ", "ได้รับประกาศนียบัตรเมื่อผ่านการอบรม", "กลุ่มเล็ก ดูแลทั่วถึง เน้นลงมือฝึกจริง"];
const CURRICULUM = ["การประเมินสถานการณ์และความปลอดภัยก่อนเข้าช่วยเหลือ", "การทำ CPR สำหรับผู้ใหญ่ เด็ก และทารก", "หลักการทำงานและวิธีใช้งานเครื่อง AED", "การช่วยเหลือผู้ที่มีสิ่งอุดกั้นทางเดินหายใจ (Choking)", "การฝึกซ้อมสถานการณ์จำลองแบบทีม"];
const AUDIENCE = ["พนักงานองค์กรที่ต้องมีความพร้อมด้านความปลอดภัย", "บุคลากรทางการแพทย์ที่ต้องการทบทวนทักษะ", "ผู้ดูแลผู้สูงอายุหรือเด็ก", "ประชาชนทั่วไปที่สนใจทักษะการช่วยชีวิต"];

export default function CprAedBasicPage() {
  return (
    <div className="course-detail">
      {/* ===== Hero ===== */}
      <section className="crs-cpr-hero">
        <img src="/image/csr/csr.avif" alt="หลักสูตรการช่วยชีวิตขั้นพื้นฐาน" className="crs-cpr-hero__img" />
        <div className="crs-cpr-hero__overlay" />
        <div className="wrap narrow crs-cpr-hero__content reveal">
          <div className="en">AED (CPR & AED Training)</div>
          <h1>หลักสูตรการช่วยชีวิตขั้นพื้นฐาน</h1>
          <p className="sub">หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง AED</p>
        </div>
      </section>

      {/* ===== ระยะเวลา / ระดับ / ประกาศนียบัตร ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <div className="crs-cpr-meta">
            <div>
              <span className="crs-cpr-meta__label">ระยะเวลาอบรม</span>
              <span className="crs-cpr-meta__value">1 วัน (6-8 ชั่วโมง)</span>
            </div>
            <div>
              <span className="crs-cpr-meta__label">ระดับผู้เข้าอบรม</span>
              <span className="crs-cpr-meta__value">บุคคลทั่วไป ไม่จำเป็นต้องมีพื้นฐานทางการแพทย์</span>
            </div>
            <div>
              <span className="crs-cpr-meta__label">เมื่อจบหลักสูตร</span>
              <span className="crs-cpr-meta__value">ได้รับประกาศนียบัตร</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร — ลิสต์ซ้าย รูปขวา ===== */}
      <section className="sec">
        <div className="wrap reveal">
          <div className="crs-cpr-split">
            <div className="crs-cpr-split__text">
              <h2 className="sec">จุดเด่นของหลักสูตร</h2>
              <ul className="crs-cpr-list">
                {HIGHLIGHTS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="crs-cpr-split__media">
              <img src="/image/csr/csr.avif" alt="หลักสูตรการช่วยชีวิตขั้นพื้นฐาน" />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก — ลำดับตัวเลข 01 02 03 ===== */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ol className="crs-cpr-steps">
            {CURRICULUM.map((item, i) => (
              <li key={i}>
                <span className="crs-cpr-steps__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="crs-cpr-steps__text">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ภาพบรรยากาศการอบรม ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
          <CourseGallery images={GALLERY_IMAGES} title="หลักสูตรการช่วยชีวิตขั้นพื้นฐาน" />
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม — checklist ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="crs-cpr-check">
            {AUDIENCE.map((item, i) => (
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
              .filter((c) => c.slug !== 'cpr-aed-basic')
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