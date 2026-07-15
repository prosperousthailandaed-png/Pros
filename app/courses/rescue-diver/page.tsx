// app/courses/rescue-diver/page.tsx
// หน้าหลักสูตร "หลักสูตรการดำน้ำเพื่อการกู้ภัย" — standalone แยกจากหลักสูตรอื่นทั้งหมด
// แก้โครงสร้าง/เนื้อหาของไฟล์นี้ได้อิสระ ไม่กระทบหลักสูตรอื่นอีก 3 หลักสูตร
// CSS เฉพาะหน้านี้อยู่ใน globals.css ภายใต้ prefix .crs-dive-*
// (คลาสที่ยังใช้ร่วมกับหน้าอื่น: .wrap/.narrow/.sec/.mist/.finale/.btn/.en/.ccard/.cbody/.foot
//  /.link-more/.related-grid/.course-detail/.course-gallery* — ของเหล่านี้ "ไม่ได้" ถูกแยกเฉพาะหน้า)

import Link from 'next/link';
import { courses } from '@/lib/data/courses';
import CourseGallery from '@/components/CourseGallery';

export const metadata = {
  title: 'หลักสูตรการดำน้ำเพื่อการกู้ภัย | Prosperous',
  description: 'หลักสูตรฝึกอบรมนักดำน้ำกู้ภัยมืออาชีพ',
};

const GALLERY_IMAGES = ["/image/rescue/diving.avif", "/image/rescue/lifeguard.avif"];
const HIGHLIGHTS = ["หลักสูตรมาตรฐานสำหรับนักดำน้ำกู้ภัยมืออาชีพ", "ฝึกทั้งภาคทฤษฎีและปฏิบัติในสถานการณ์จำลอง", "อุปกรณ์ดำน้ำและอุปกรณ์กู้ภัยครบครัน", "วิทยากรผู้เชี่ยวชาญด้านการดำน้ำกู้ภัยโดยตรง"];
const CURRICULUM = ["การวางแผนและจัดการความเสี่ยงในภารกิจดำน้ำกู้ภัย", "เทคนิคการค้นหาใต้น้ำแบบเป็นทีม", "การช่วยเหลือนักดำน้ำที่ตื่นตระหนกหรือหมดสติ", "การนำผู้ประสบภัยขึ้นสู่ผิวน้ำอย่างปลอดภัย", "การปฐมพยาบาลและการจัดการภาวะฉุกเฉินจากการดำน้ำ"];
const AUDIENCE = ["มีใบประกาศนียบัตรดำน้ำ Open Water หรือเทียบเท่า", "มีสุขภาพร่างกายแข็งแรง ไม่มีโรคประจำตัวที่เป็นข้อห้ามในการดำน้ำ", "เจ้าหน้าที่กู้ภัย หน่วยงานความปลอดภัยทางทะเล"];

export default function RescueDiverPage() {
  return (
    <div className="course-detail">
      {/* ===== Hero ===== */}
      <section className="crs-dive-hero">
        <img src="/image/rescue/diving.avif" alt="หลักสูตรการดำน้ำเพื่อการกู้ภัย" className="crs-dive-hero__img" />
        <div className="crs-dive-hero__overlay" />
        <div className="wrap narrow crs-dive-hero__content reveal">
          <div className="en">RESCUE DIVER</div>
          <h1>หลักสูตรการดำน้ำเพื่อการกู้ภัย</h1>
          <p className="sub">หลักสูตรฝึกอบรมนักดำน้ำกู้ภัยมืออาชีพ</p>
        </div>
      </section>

      {/* ===== ระยะเวลา / ระดับ / ประกาศนียบัตร ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <div className="crs-dive-meta">
            <div>
              <span className="crs-dive-meta__label">ระยะเวลาอบรม</span>
              <span className="crs-dive-meta__value">3 วัน (24 ชั่วโมง)</span>
            </div>
            <div>
              <span className="crs-dive-meta__label">ระดับผู้เข้าอบรม</span>
              <span className="crs-dive-meta__value">ผู้ที่มีใบประกาศนียบัตรดำน้ำพื้นฐาน (Open Water) ขึ้นไป</span>
            </div>
            <div>
              <span className="crs-dive-meta__label">เมื่อจบหลักสูตร</span>
              <span className="crs-dive-meta__value">ได้รับประกาศนียบัตร</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== จุดเด่นของหลักสูตร — ลิสต์ซ้าย รูปขวา ===== */}
      <section className="sec">
        <div className="wrap reveal">
          <div className="crs-dive-split">
            <div className="crs-dive-split__text">
              <h2 className="sec">จุดเด่นของหลักสูตร</h2>
              <ul className="crs-dive-list">
                {HIGHLIGHTS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="crs-dive-split__media">
              <img src="/image/rescue/diving.avif" alt="หลักสูตรการดำน้ำเพื่อการกู้ภัย" />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== เนื้อหาที่จะได้ฝึก — ลำดับตัวเลข 01 02 03 ===== */}
      <section className="mist">
        <div className="wrap narrow reveal">
          <h2 className="sec">เนื้อหาที่จะได้ฝึก</h2>
          <ol className="crs-dive-steps">
            {CURRICULUM.map((item, i) => (
              <li key={i}>
                <span className="crs-dive-steps__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="crs-dive-steps__text">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ภาพบรรยากาศการอบรม ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">ภาพบรรยากาศการอบรม</h2>
          <CourseGallery images={GALLERY_IMAGES} title="หลักสูตรการดำน้ำเพื่อการกู้ภัย" />
        </div>
      </section>

      {/* ===== คุณสมบัติผู้เข้าอบรม — checklist ===== */}
      <section className="sec">
        <div className="wrap narrow reveal">
          <h2 className="sec">คุณสมบัติผู้เข้าอบรม</h2>
          <ul className="crs-dive-check">
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
              .filter((c) => c.slug !== 'rescue-diver')
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