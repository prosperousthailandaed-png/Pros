// lib/data/courses.ts
// ข้อมูลหลักสูตรฝึกอบรมทั้งหมด แบบ centralized (ตามแพทเทิร์นเดียวกับ aed-products.ts)
// ใช้ทั้งใน HomePage (section #courses) และหน้า /courses, /courses/[slug]

export interface Course {
  slug: string;          // ใช้เป็น URL: /courses/[slug]
  category: string;      // ป้ายหมวดหมู่ (คลาส .en) เช่น "AED (CPR & AED Training)"
  title: string;         // ชื่อหลักสูตรภาษาไทย
  description: string;   // คำอธิบายสั้น ๆ ใช้ในการ์ด .ccard
  image: string;         // path รูปภาพ .avif ใน public/image/

  // ฟิลด์เสริมสำหรับหน้า detail (ใส่เนื้อหาจริงทีหลัง)
  duration?: string;       // ระยะเวลาอบรม เช่น "1 วัน (8 ชั่วโมง)"
  level?: string;          // ระดับผู้เข้าอบรม เช่น "บุคคลทั่วไป ไม่จำเป็นต้องมีพื้นฐาน"
  highlights?: string[];   // จุดเด่นของหลักสูตร
  curriculum?: string[];   // หัวข้อเนื้อหาที่จะสอน
  audience?: string[];     // คุณสมบัติผู้เข้าอบรม
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

// หา course จาก slug ใช้ตอนสร้างหน้า detail
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// ใช้กับ generateStaticParams
export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}