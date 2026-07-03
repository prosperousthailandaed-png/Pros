// components/AedProductDetail.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AedProduct } from "@/lib/data/aed-products";

export default function AedProductDetail({ product }: { product: AedProduct }) {
  const [tab, setTab] = useState<"image" | "video">("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (tab !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [tab]);

  return (
    <div className="product product-aed">
      <Link href="/products/aed" className="p-back">
        ← กลับ
      </Link>

      <section className="p-hero">
        <div className="pmedia-frame reveal">
          {tab === "image" ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="pmedia-img"
              priority
            />
          ) : (
            <video
              ref={videoRef}
              src={product.video}
              className="pmedia-video"
              muted
              loop
              playsInline
              autoPlay
            />
          )}

          <div className="ptabs">
            <button
              type="button"
              className={`ptab ${tab === "image" ? "is-active" : ""}`}
              onClick={() => setTab("image")}
            >
              รูปภาพ
            </button>
            <button
              type="button"
              className={`ptab ${tab === "video" ? "is-active" : ""}`}
              onClick={() => setTab("video")}
            >
              วิดีโอ
            </button>
          </div>
        </div>

        <div className="wrap p-hero-body reveal">
          <span className="eyebrow">Acoresmed · {product.model}</span>
          <h1 className="sec">{product.name}</h1>
          <p className="sub">{product.tagline}</p>
          <p className="p-desc">{product.description}</p>
        </div>
      </section>

      <section className="sec-wrap p-features-sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">จุดเด่นของเครื่อง</h2>
          </div>
          <ul className="p-feature-list reveal">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-wrap p-specs-sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h3 className="sec">คุณสมบัติทางเทคนิค</h3>
            <p className="sub">ข้อมูลจำเพาะของเครื่อง {product.name}</p>
          </div>
          <div className="spec-list reveal">
            {product.specs.map((s) => (
              <div className="spec-row" key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}