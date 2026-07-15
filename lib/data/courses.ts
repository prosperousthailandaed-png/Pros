// lib/data/courses.ts
// ข้อมูลสรุปหลักสูตรทั้งหมด แบบ centralized — ใช้แค่สำหรับ "การ์ดแสดงรายการ"
// (หน้าแรก section #courses, หน้า /courses, และการ์ด "หลักสูตรอื่นๆ" ท้ายหน้า detail)
//
// ⚠️ รายละเอียดเชิงลึกของแต่ละหลักสูตร (duration, level, highlights, curriculum,
// audience, gallery, certification) ย้ายไป hardcode อยู่ในแต่ละไฟล์แล้ว:
//   app/courses/cpr-aed-basic/page.tsx
//   app/courses/rescue-swimmer/page.tsx
//   app/courses/rescue-diver/page.tsx
//   app/courses/lifeguard-training/page.tsx
// แก้รายละเอียดหลักสูตรไหน ให้ไปแก้ที่ไฟล์ page.tsx ของหลักสูตรนั้นโดยตรง
// แก้ในไฟล์นี้จะ "ไม่มีผล" กับหน้ารายละเอียดอีกต่อไป

export interface Course {
  slug: string;          // ใช้เป็น URL: /courses/[slug]
  category: string;      // ป้ายหมวดหมู่ (คลาส .en) เช่น "AED (CPR & AED Training)"
  title: string;         // ชื่อหลักสูตรภาษาไทย
  description: string;   // คำอธิบายสั้น ๆ ใช้ในการ์ด .ccard
  image: string;         // path รูปภาพ .avif ใน public/image/
}

export const courses: Course[] = [
  {
    slug: "cpr-aed-basic",
    category: "AED (CPR & AED Training)",
    title: "หลักสูตรการช่วยชีวิตขั้นพื้นฐาน",
    description: "หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง AED",
    image: "/image/csr/csr.avif",
  },
  {
    slug: "rescue-swimmer",
    category: "RESCUE SWIMMER",
    title: "หลักสูตรกู้ภัยทางน้ำทางทะเล",
    description:
      "ฝึกการว่ายน้ำตัวเปล่า และการช่วยเหลือผู้ประสบภัยในกรณีที่ไม่มีอุปกรณ์ช่วยเหลือ",
    image: "/image/rescue/rescue_swimmer.avif",
  },
  {
    slug: "rescue-diver",
    category: "RESCUE DIVER",
    title: "หลักสูตรการดำน้ำเพื่อการกู้ภัย",
    description: "หลักสูตรฝึกอบรมนักดำน้ำกู้ภัยมืออาชีพ",
    image: "/image/rescue/diving.avif",
  },
  {
    slug: "lifeguard-training",
    category: "LIFEGUARD TRAINING",
    title: "หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ",
    description: "หลักสูตรฝึกอบรมเจ้าหน้าที่กู้ภัยทางน้ำ",
    image: "/image/rescue/lifeguard.avif",
  },
];

// ใช้กับ generateStaticParams / sitemap.ts (ถ้าเพิ่มไฟล์ app/sitemap.ts ไว้แล้ว
// ฟังก์ชันนี้ยังถูกเรียกใช้อยู่ — อย่าลบ)
export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}