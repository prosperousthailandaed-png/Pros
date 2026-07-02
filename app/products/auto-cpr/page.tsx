'use client';

import { useState } from 'react';
import Link from 'next/link';

const SPECS: { label: string; value: string }[] = [
  { label: 'ความถี่การกดหน้าอก', value: '100 ครั้ง/นาที' },
  { label: 'ระยะกดหน้าอก', value: 'ปรับได้ 0–3.2 นิ้ว (0–8 ซม.)' },
  { label: 'อัตราส่วนกด:ปล่อย', value: '50:50' },
  { label: 'น้ำหนักตัวเครื่อง', value: '19 ปอนด์ (8.6 กก.)' },
  { label: 'แหล่งพลังงาน', value: 'ออกซิเจนอัดหรือ Medical Air 50–90 PSI' },
  { label: 'มาตรฐาน', value: 'สอดคล้องแนวทาง AHA' },
];

export default function AutoCprPage() {
  const [tab, setTab] = useState<'image' | 'video'>('image');

  return (
    <div className="product">
      {/* hero: ชื่อสินค้า + คำโปรย เหมือนโครง about-hero แต่ไม่ใช้พื้นเข้ม */}
      <section className="p-hero">
        <div className="wrap">
          <span className="eyebrow">AUTO CPR</span>
          <h1 className="sec">เครื่องนวดหัวใจอัตโนมัติ</h1>
          <p className="sub">
            Auto CPR จาก Michigan Instruments ช่วยกดหน้าอกต่อเนื่องอย่างแม่นยำและสม่ำเสมอ
            ในภาวะฉุกเฉิน ลดความเหนื่อยล้าของผู้ช่วยเหลือ และเพิ่มโอกาสรอดชีวิตของผู้ป่วย
          </p>
        </div>
      </section>

      {/* สื่อหลัก: สลับดูรูปใหญ่ / วิดีโอ ด้วยแท็บ */}
      <section className="p-media-sec">
        <div className="wrap">
          <div className="ptabs">
            <button
              className={`ptab ${tab === 'image' ? 'is-active' : ''}`}
              onClick={() => setTab('image')}
            >
              รูปใหญ่
            </button>
            <button
              className={`ptab ${tab === 'video' ? 'is-active' : ''}`}
              onClick={() => setTab('video')}
            >
              วิดีโอ
            </button>
          </div>

          <div className="pmedia-frame">
            {tab === 'image' ? (
              <img src="/image/AutoCPR_1.avif" alt="Auto CPR" className="pmedia-img" />
            ) : (
              <video
                src="/video/autocpr.mp4"
                className="pmedia-video"
                controls
                autoPlay
                muted
                playsInline
                loop
              />
            )}
          </div>
        </div>
      </section>

      {/* คุณสมบัติทางเทคนิค: การ์ดขาวสไตล์เดียวกับ timeline-card */}
      <section className="mist p-specs-sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">คุณสมบัติทางเทคนิค</h2>
            <p className="sub">ข้อมูลจำเพาะของเครื่อง Auto CPR รุ่น Thumper</p>
          </div>

          <div className="spec-card reveal">
            {SPECS.map((s) => (
              <div className="spec-row" key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ปิดท้ายด้วย CTA เข้มเหมือนหน้าแรก */}
      <section className="finale">
        <div className="narrow reveal">
          <h2>สนใจเครื่อง Auto CPR สำหรับหน่วยงานของคุณ?</h2>
          <p>ปรึกษาผู้เชี่ยวชาญของเราเพื่อเลือกรุ่นที่เหมาะกับการใช้งานจริง</p>
          <div className="ctas">
            <Link href="/about" className="btn btn-primary">
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}