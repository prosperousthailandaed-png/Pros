'use client';

import { useState } from 'react';

interface CourseGalleryProps {
  images: string[];
  title: string;
}

export default function CourseGallery({ images, title }: CourseGalleryProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="course-gallery">
      <div
        className="course-gallery__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="course-gallery__slide" key={i}>
            <img src={src} alt={`${title} — ภาพที่ ${i + 1}`} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="course-gallery__arrow course-gallery__arrow--prev"
            onClick={goPrev}
            aria-label="ภาพก่อนหน้า"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="course-gallery__arrow course-gallery__arrow--next"
            onClick={goNext}
            aria-label="ภาพถัดไป"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <span className="course-gallery__counter">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}