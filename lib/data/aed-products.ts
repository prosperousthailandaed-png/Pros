// lib/data/aed-products.ts

export type AedSpec = { label: string; value: string };

export type AedProduct = {
  slug: string;
  name: string;
  model: string;
  tagline: string;
  description: string;
  image: string;
  video: string;
  features: string[];
  specs: AedSpec[];
};

export const aedProducts: Record<string, AedProduct> = {
  a112: {
    slug: "a112",
    name: "AED รุ่น A112",
    model: "A112",
    tagline: "จอสี LCD นำทางทุกขั้นตอนการช่วยชีวิต",
    description:
      "เครื่องกระตุกหัวใจไฟฟ้าชนิดกึ่งอัตโนมัติ (Semi-Automated External Defibrillator) พร้อมจอแสดงผลสี LCD แสดงคำแนะนำแบบทีละขั้นตอนควบคู่กับไฟ LED ช่วยให้ผู้ใช้งานทั่วไปที่ไม่มีพื้นฐานทางการแพทย์สามารถช่วยเหลือผู้ป่วยภาวะหัวใจหยุดเต้นเฉียบพลันได้อย่างมั่นใจ",
    image: "/image/aed/A112.avif",
    video: "/video/A112.mp4",
    features: [
      "จอสี LCD แสดงขั้นตอนการช่วยชีวิตแบบภาพเคลื่อนไหว",
      "เสียงพูดนำทางละเอียดทุกขั้นตอน",
      "วิเคราะห์คลื่นไฟฟ้าหัวใจอัตโนมัติ",
      "โหมดผู้ใหญ่และโหมดเด็ก",
    ],
    specs: [
      { label: "รุ่น", value: "A112" },
      { label: "รูปแบบคลื่นไฟฟ้า", value: "Biphasic truncated exponential" },
      { label: "พลังงานสูงสุด", value: "200 จูล" },
      { label: "ลำดับพลังงาน (ผู้ใหญ่)", value: "150, 150, 200 จูล" },
      { label: "ลำดับพลังงาน (เด็ก)", value: "50, 50, 75 จูล" },
      { label: "การแสดงผล", value: "จอสี LCD และไฟ LED" },
      { label: "คำแนะนำเสียง", value: "เสียงพูดนำทางละเอียด" },
      { label: "เวลาชาร์จ", value: "น้อยกว่า 8 วิ (150J) / 12 วิ (200J)" },
    ],
  },
  a102: {
    slug: "a102",
    name: "AED รุ่น A102",
    model: "A102",
    tagline: "กะทัดรัด ใช้งานง่าย ด้วยไฟ LED นำทาง",
    description:
      "เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ (Automated External Defibrillator) ที่มาพร้อมฟีเจอร์จำเป็นครบครันสำหรับดูแลผู้ป่วยภาวะหัวใจหยุดเต้นเฉียบพลัน ใช้งานง่ายด้วยปุ่มควบคุมเพียงสามปุ่ม เหมาะสำหรับติดตั้งในพื้นที่สาธารณะ",
    image: "/image/aed/A102.avif",
    video: "/video/A102.mp4",
    features: [
      "ไฟ LED บอกสถานะการทำงานชัดเจน",
      "เสียงพูดนำทางละเอียดทุกขั้นตอน",
      "ปุ่มควบคุมสามปุ่ม ใช้งานง่าย ON/OFF, Shock, SET",
      "โหมดผู้ใหญ่และโหมดเด็ก",
    ],
    specs: [
      { label: "รุ่น", value: "A102" },
      { label: "รูปแบบคลื่นไฟฟ้า", value: "Biphasic truncated exponential" },
      { label: "พลังงานสูงสุด", value: "200 จูล" },
      { label: "ลำดับพลังงาน (ผู้ใหญ่)", value: "150, 150, 200 จูล" },
      { label: "ลำดับพลังงาน (เด็ก)", value: "50, 50, 75 จูล" },
      { label: "การแสดงผล", value: "ไฟ LED" },
      { label: "คำแนะนำเสียง", value: "เสียงพูดนำทางละเอียด" },
      { label: "เวลาชาร์จ", value: "น้อยกว่า 8 วิ (150J) / 12 วิ (200J)" },
    ],
  },
};