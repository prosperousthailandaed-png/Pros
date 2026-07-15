// app/courses/rescue-swimmer/page.tsx
// หน้าหลักสูตร "หลักสูตรกู้ภัยทางน้ำทางทะเล" — standalone แยกจากหลักสูตรอื่นทั้งหมด
// แก้โครงสร้าง/เนื้อหาของไฟล์นี้ได้อิสระ ไม่กระทบหลักสูตรอื่นอีก 3 หลักสูตร
// CSS เฉพาะหน้านี้อยู่ใน globals.css ภายใต้ prefix .crs-swim-*
// (คลาสที่ยังใช้ร่วมกับหน้าอื่น: .wrap/.narrow/.sec/.mist/.finale/.btn/.en/.ccard/.cbody/.foot
//  /.link-more/.related-grid/.course-detail/.course-gallery* — ของเหล่านี้ "ไม่ได้" ถูกแยกเฉพาะหน้า)

import Link from 'next/link';
import { courses } from '@/lib/data/courses';
import CourseGallery from '@/components/CourseGallery';

export const metadata = {
  title: 'หลักสูตรกู้ภัยทางน้ำทางทะเล | Prosperous',
  description: 'ฝึกการว่ายน้ำตัวเปล่า และการช่วยเหลือผู้ประสบภัยในกรณีที่ไม่มีอุปกรณ์ช่วยเหลือ',
};

const GALLERY_IMAGES = ["/image/rescue/rescue_swimmer.avif", "/image/rescue/swimmer.avif"];
const HIGHLIGHTS = ["ฝึกโดยครูฝึกที่มีประสบการณ์กู้ภัยทางทะเล", "เน้นการฝึกภาคปฏิบัติในสภาพน้ำจริง", "เทคนิคการเข้าช่วยเหลือแบบตัวเปล่า ไม่ใช้อุปกรณ์", "ฝึกความแข็งแกร่งทางร่างกายและจิตใจควบคู่กัน"];
const CURRICULUM = ["พื้นฐานการว่ายน้ำเพื่อการกู้ภัย และเทคนิคการลอยตัว", "การเข้าถึงผู้ประสบภัยอย่างปลอดภัย", "เทคนิคการพยุงและลากตัวผู้ประสบภัยเข้าฝั่ง", "การหลุดพ้นเมื่อถูกผู้ประสบภัยเกาะกุม", "การปฐมพยาบาลเบื้องต้นหลังนำผู้ประสบภัยขึ้นฝั่ง"];
const AUDIENCE = ["ว่ายน้ำได้คล่องและมีสุขภาพแข็งแรง", "เจ้าหน้าที่รักษาความปลอดภัยชายหาดหรือสระว่ายน้ำ", "ผู้ที่สนใจงานกู้ภัยทางน้ำเป็นอาชีพ", "ฝึกแบบ Militaly Style", "มีการทดสอบสอบร่างกายเพื่อคัดเลือก"];

export default function RescueSwimmerPage() {
  return (
    <div className="course-detail">
      {/* ===== Hero ===== */}
      <section className="crs-swim-hero">
        <img src="/image/rescue/rescue_swimmer.avif" alt="หลักสูตรกู้ภัยทางน้ำทางทะเล" className="crs-swim-hero__img" />
        <div className="crs-swim-hero__overlay" />
        <div className="wrap narrow crs-swim-hero__content reveal">
          <div className="en">RESCUE SWIMMER</div>
          <h1>หลักสูตรกู้ภัยทางน้ำทางทะเล</h1>
          <p className="sub">ฝึกการว่ายน้ำตัวเปล่า และการช่วยเหลือผู้ประสบภัยในกรณีที่ไม่มีอุปกรณ์ช่วยเหลือ</p>
        </div>
      </section>

      {/* ===== ระยะเวลา / ระดับ / ประกาศนียบัตร ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <div className="crs-swim-meta">
            <div>
              <span className="crs-swim-meta__label">ระยะเวลาอบรม</span>
              <span className="crs-swim-meta__value">5 วัน (16 ชั่วโมง)</span>
            </div>
            <div>
              <span className="crs-swim-meta__label">ระดับผู้เข้าอบรม</span>
              <span className="crs-swim-meta__value">ผู้ที่ว่ายน้ำเป็นและมีสุขภาพร่างกายแข็งแรง มีการทดสอบร่างกาย</span>
            </div>
            <div>
              <span className="crs-swim-meta__label">เมื่อจบหลักสูตร</span>
              <span className="crs-swim-meta__value">ได้รับใบรับรองทักษะกู้ภัยทางน้ำทางทะเล และเข็มของหลักสูตร</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร — ลิสต์ซ้าย รูปขวา ===== */}
      <section className="sec">
        <div className="wrap reveal">
          <div className="crs-swim-split">
            <div className="crs-swim-split__text">
              <h2 className="sec">จุดเด่นของหลักสูตร</h2>
              <ul className="crs-swim-list">
                {HIGHLIGHTS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="crs-swim-split__media">
              <img src="/image/rescue/rescue_swimmer.avif" alt="หลักสูตรกู้ภัยทางน้ำทางทะเล" />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก — ลำดับตัวเลข 01 02 03 ===== */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ol className="crs-swim-steps">
            {CURRICULUM.map((item, i) => (
              <li key={i}>
                <span className="crs-swim-steps__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="crs-swim-steps__text">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ภาพบรรยากาศการอบรม ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
          <CourseGallery images={GALLERY_IMAGES} title="หลักสูตรกู้ภัยทางน้ำทางทะเล" />
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม — checklist ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="crs-swim-check">
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
              .filter((c) => c.slug !== 'rescue-swimmer')
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