'use client'
import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/Icon'

const SLIDES = [
  {
    title: 'ทุกวินาทีมีค่า เมื่อหัวใจหยุดเต้น',
    body: 'เครื่องกระตุกหัวใจอัตโนมัติจาก Prosperous ใช้งานง่าย เสียงแนะนำภาษาไทย พร้อมช่วยชีวิตในนาทีวิกฤตทุกสถานการณ์',
    ctaHref: '/products/aed',
    image: '/image/docter.avif',
  },
  {
    title: 'บริการครบวงจรความปลอดภัยสำหรับทุกองค์กร',
    body: 'ตั้งแต่สระว่ายน้ำ โรงแรม โรงเรียน ไปจนถึงองค์กรขนาดใหญ่ — AED ไลฟ์การ์ด และอบรม CPR ครบในที่เดียว',
    ctaHref: '/solutions',
    image: '/image/emergency.avif',
  },
  {
    title: 'เสริมพลังชุมชนของคุณให้ช่วยชีวิตได้',
    body: 'ทุกคนสามารถเป็นผู้ช่วยชีวิตได้ โปรแกรมอบรม CPR และ AED ของเรามอบความรู้และทักษะที่ใช้ได้จริงในยามฉุกเฉิน',
    ctaHref: '/heart-champion',
    image: '/image/csr.avif',
    position: 'center 30%',
  },
]

const STANDARDS = ['FDA', 'CE', 'ISO 13485', 'AHA 2020']

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const tot = SLIDES.length

  const goTo = (n: number) => setCur(n)
  const slide = (d: number) => setCur(prev => (prev + d + tot) % tot)

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${cur * 33.333}%)`
    }
  }, [cur])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => setCur(c => (c + 1) % tot), 7000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, tot])

  const s = SLIDES[cur]

  return (
    <section
      className="relative h-[580px] overflow-hidden bg-ink max-md:h-[480px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide track */}
      <div
        ref={slidesRef}
        className="hero-track absolute inset-0 flex w-[300%] h-full duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
      >
        {SLIDES.map((slideItem, i) => (
          <div key={i} className="relative w-[33.333%] h-full overflow-hidden">
            <img
            src={slideItem.image}
            alt={slideItem.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: slideItem.position ?? 'center' }}
            />
            <div className="hero-slide-overlay absolute inset-0" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-[2] flex items-end pb-20 max-md:pb-16">
        <div className="w-full max-w-[1140px] mx-auto px-10 max-md:px-5">
          <div className="max-w-[560px] text-white max-md:text-center max-md:mx-auto">
            <div className="flex items-center gap-3 mb-4 max-md:justify-center">
              <svg viewBox="0 0 80 24" className="w-[64px] h-5 max-md:hidden">
                <path className="ecg-line ecg-draw" d="M2 12h14l3-8 5 16 4-12 2 4h6l3-6 4 14 3-8h22" />
              </svg>
            </div>
            <h1 className="text-[44px] font-extrabold leading-[1.12] mb-4 tracking-[-0.5px] max-md:text-[28px]">
              {s.title}
            </h1>
            <p className="text-[15px] leading-[1.8] text-white/75 mb-7 max-w-[460px] max-md:text-[13px] max-md:mx-auto">
              {s.body}
            </p>

            {/* Standards row */}
            <div className="flex items-center gap-4 mt-9 max-md:justify-center max-md:flex-wrap max-md:gap-2.5">
              <span className="text-[11px] uppercase tracking-[1.5px] text-white/40">รับรองมาตรฐาน</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {STANDARDS.map(st => (
                  <span key={st} className="text-[11px] font-bold text-white/80 border border-white/20 rounded-md px-2.5 py-1">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[1240px] left-1/2 -translate-x-1/2 flex justify-between px-3 z-[3] pointer-events-none max-md:hidden">
        <button onClick={() => slide(-1)} className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-white/25" aria-label="สไลด์ก่อนหน้า">
          <Icon name="arrowRight" className="w-5 h-5 rotate-180" />
        </button>
        <button onClick={() => slide(1)} className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-white/25" aria-label="สไลด์ถัดไป">
          <Icon name="arrowRight" className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2.5 z-[3]">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`ไปสไลด์ ${i + 1}`}
            className={`h-[7px] rounded-full border-0 cursor-pointer transition-all p-0 ${i === cur ? 'w-7 bg-[#F5A623]' : 'w-[7px] bg-white/35'}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-[4]">
          <div key={cur} className="progress-bar h-full bg-[#F5A623]" />
        </div>
      )}
    </section>
  )
}