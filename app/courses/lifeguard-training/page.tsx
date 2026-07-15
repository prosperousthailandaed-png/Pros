// app/courses/lifeguard-training/page.tsx
// หน้าหลักสูตร "หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ" — standalone แยกจากหลักสูตรอื่นทั้งหมด
// แก้โครงสร้าง/เนื้อหาของไฟล์นี้ได้อิสระ ไม่กระทบหลักสูตรอื่นอีก 3 หลักสูตร
// CSS เฉพาะหน้านี้อยู่ใน globals.css ภายใต้ prefix .crs-guard-*
// (คลาสที่ยังใช้ร่วมกับหน้าอื่น: .wrap/.narrow/.sec/.mist/.finale/.btn/.en/.ccard/.cbody/.foot
//  /.link-more/.related-grid/.course-detail/.course-gallery* — ของเหล่านี้ "ไม่ได้" ถูกแยกเฉพาะหน้า)

import Link from 'next/link';
import { courses } from '@/lib/data/courses';
import CourseGallery from '@/components/CourseGallery';

export const metadata = {
  title: 'หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ | Prosperous',
  description: 'หลักสูตรฝึกอบรมเจ้าหน้าที่กู้ภัยทางน้ำ',
};

const GALLERY_IMAGES = ["/image/rescue/diving.avif", "/image/rescue/lifeguard.avif"];
const HIGHLIGHTS = ["หลักสูตรครบวงจรสำหรับผู้ที่ต้องการเป็นเจ้าหน้าที่ Lifeguard", "ฝึกทั้งการเฝ้าระวังและการเข้าช่วยเหลือ", "รวมการทำ CPR และการใช้ AED ในหลักสูตรเดียว", "ได้รับประกาศนียบัตรรับรองการผ่านหลักสูตร"];
const CURRICULUM = ["หลักการเฝ้าระวังและสังเกตสัญญาณอันตรายในน้ำ", "เทคนิคการเข้าช่วยเหลือด้วยและไม่ใช้อุปกรณ์ลอยน้ำ", "การช่วยชีวิตขั้นพื้นฐาน (CPR) และการใช้เครื่อง AED", "การจัดการฝูงชนและการสื่อสารในสถานการณ์ฉุกเฉิน", "การฝึกซ้อมสถานการณ์จำลองในพื้นที่จริง"];
const AUDIENCE = ["ว่ายน้ำได้คล่องและมีสุขภาพแข็งแรง", "ผู้ที่ต้องการทำงานเป็นเจ้าหน้าที่ดูแลความปลอดภัยทางน้ำ", "พนักงานสระว่ายน้ำ รีสอร์ท หรือสถานที่ท่องเที่ยวทางน้ำ"];

export default function LifeguardTrainingPage() {
  return (
    <div className="course-detail">
      {/* ===== Hero ===== */}
      <section className="crs-guard-hero">
        <img src="/image/rescue/lifeguard.avif" alt="หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ" className="crs-guard-hero__img" />
        <div className="crs-guard-hero__overlay" />
        <div className="wrap narrow crs-guard-hero__content reveal">
          <div className="en">LIFEGUARD TRAINING</div>
          <h1>หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ</h1>
          <p className="sub">หลักสูตรฝึกอบรมเจ้าหน้าที่กู้ภัยทางน้ำ</p>
        </div>
      </section>

      {/* ===== ระยะเวลา / ระดับ / ประกาศนียบัตร ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <div className="crs-guard-meta">
            <div>
              <span className="crs-guard-meta__label">ระยะเวลาอบรม</span>
              <span className="crs-guard-meta__value">2 วัน (16 ชั่วโมง)</span>
            </div>
            <div>
              <span className="crs-guard-meta__label">ระดับผู้เข้าอบรม</span>
              <span className="crs-guard-meta__value">บุคคลทั่วไปที่ว่ายน้ำเป็น ไม่จำเป็นต้องมีประสบการณ์กู้ภัยมาก่อน</span>
            </div>
            <div>
              <span className="crs-guard-meta__label">เมื่อจบหลักสูตร</span>
              <span className="crs-guard-meta__value">ได้รับประกาศนียบัตร</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร — ลิสต์ซ้าย รูปขวา ===== */}
      <section className="sec">
        <div className="wrap reveal">
          <div className="crs-guard-split">
            <div className="crs-guard-split__text">
              <h2 className="sec">จุดเด่นของหลักสูตร</h2>
              <ul className="crs-guard-list">
                {HIGHLIGHTS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="crs-guard-split__media">
              <img src="/image/rescue/lifeguard.avif" alt="หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ" />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก — ลำดับตัวเลข 01 02 03 ===== */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ol className="crs-guard-steps">
            {CURRICULUM.map((item, i) => (
              <li key={i}>
                <span className="crs-guard-steps__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="crs-guard-steps__text">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ภาพบรรยากาศการอบรม ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
          <CourseGallery images={GALLERY_IMAGES} title="หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ" />
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม — checklist ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="crs-guard-check">
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
              .filter((c) => c.slug !== 'lifeguard-training')
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