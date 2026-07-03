'use client';

import { useEffect, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <div className="product">
      <section className="cpr-media">
        <video
          ref={videoRef}
          src="/video/Autocpr1.mp4"
          className="cpr-media-video"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      </section>

      <section className="cpr-intro">
        <div className="wrap">
          <span className="cpr-eyebrow">AUTO CPR</span>
          <h1 className="cpr-title">เครื่องนวดหัวใจอัตโนมัติ</h1>
          <p className="cpr-lead">
            Auto CPR จาก Michigan Instruments ช่วยกดหน้าอกต่อเนื่องอย่างแม่นยำและสม่ำเสมอ
            ในภาวะฉุกเฉิน ลดความเหนื่อยล้าของผู้ช่วยเหลือ และเพิ่มโอกาสรอดชีวิตของผู้ป่วย
          </p>
        </div>
      </section>

      <section className="p-specs-sec" id="specs">
        <div className="wrap">
          <div className="spec-list reveal">
            {SPECS.map((s) => (
              <div className="spec-row" key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="sec-head reveal">
            <h2 className="sec">คุณสมบัติทางเทคนิค</h2>
            <p className="sub">ข้อมูลจำเพาะของเครื่อง Auto CPR รุ่น Thumper</p>
          </div>
        </div>
      </section>

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