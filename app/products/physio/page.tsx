"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "ultrasound",
    name: "เครื่องอัลตราซาวด์บำบัด",
    tag: "Ultrasound Therapy",
    desc: "คลื่นอัลตราซาวด์บำบัดลึกถึงชั้นกล้ามเนื้อ ปรับความถี่ได้ 1MHz/3MHz หน้าจอสัมผัสควบคุมง่าย",
    image: "/image/physio/ultrasound.png",
  },
  {
    id: "treatment-table",
    name: "เตียงกายภาพบำบัด",
    tag: "Treatment Table",
    desc: "เตียงปรับระดับไฟฟ้า 3 ท่อน รองรับน้ำหนักสูง เคลื่อนย้ายสะดวกด้วยล้อล็อกได้",
    image: "/image/physio/treatmentTable.png",
  },
  {
    id: "tens",
    name: "เครื่องกระตุ้นไฟฟ้า TENS",
    tag: "TENS Stimulator",
    desc: "บรรเทาอาการปวดกล้ามเนื้อด้วยกระแสไฟฟ้า พกพาสะดวก ปรับความเข้มได้หลายระดับ",
    image: "/image/physio/tens.png",
  },
  {
    id: "bike",
    name: "จักรยานฟื้นฟูกล้ามเนื้อ",
    tag: "Pedal Exerciser",
    desc: "อุปกรณ์ออกกำลังกายฟื้นฟูแขน-ขา ปรับแรงต้านได้ เหมาะสำหรับผู้ป่วยพักฟื้น",
    image: "/image/physio/bike.png",
  },
];

export default function PhysioPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="physio">
      <section className="physio-hero">
        <video
          ref={videoRef}
          className="physio-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/physio.mp4" type="video/mp4" />
        </video>
      </section>

      <div className="wrap physio-hero-content">
        <p className="physio-eyebrow">PROSPEROUS PHYSIO</p>
        <h1>อุปกรณ์กายภาพบำบัด</h1>
        <p className="sub">
          เครื่องมือฟื้นฟูและบำบัดคุณภาพสูง สำหรับคลินิกและศูนย์กายภาพบำบัด
        </p>
      </div>

      <section className="sec physio-list">
        <div className="wrap">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.id}
              className={`physio-row reveal ${i % 2 === 1 ? "physio-row--rev" : ""}`}
            >
              <div className="physio-row-media">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={800}
                  className="physio-row-img"
                />
              </div>
              <div className="physio-row-body">
                <span className="physio-row-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="physio-row-tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="physio-row-soon">รายละเอียดเร็วๆ นี้</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}