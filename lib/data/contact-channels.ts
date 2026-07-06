// lib/data/contact-channels.ts
// ข้อมูลช่องทางติดต่อทั้งหมด ใช้ในหน้า /contact
// แก้เบอร์โทร / LINE ID / Facebook Page / อีเมล ให้เป็นของจริงได้ที่นี่ที่เดียว

export type ContactIcon = 'chat' | 'line' | 'phone' | 'messenger' | 'email';

export interface ContactChannel {
  id: string;
  icon: ContactIcon;
  title: string;
  description: string;
  ctaLabel: string;
  href: string; // tel: / mailto: / https://line.me/... / https://m.me/... / '#chat-widget'
}

export const contactChannels: ContactChannel[] = [
  {
    id: 'chat',
    icon: 'chat',
    title: 'แชทสดกับเจ้าหน้าที่',
    description: 'คุยกับทีมงานได้ทันทีผ่านหน้าเว็บไซต์ ตอบไว ไม่ต้องโทร',
    ctaLabel: 'เริ่มแชท',
    // TODO: เปลี่ยนเป็นตัวเปิด live chat widget จริง (เช่น LINE OA Chat Plugin, Crisp, Tawk.to)
    href: '#chat-widget',
  },
  {
    id: 'line',
    icon: 'line',
    title: 'แอดไลน์ทางการ',
    description: 'สอบถามข้อมูลสินค้าและสั่งซื้อผ่าน LINE Official Account',
    ctaLabel: 'เพิ่มเพื่อน',
    // TODO: ใส่ LINE ID จริง
    href: 'https://line.me/ti/p/@prosperous',
  },
  {
    id: 'phone',
    icon: 'phone',
    title: 'โทรหาเรา',
    description: 'ติดต่อฝ่ายขายและบริการลูกค้าโดยตรงในเวลาทำการ',
    ctaLabel: 'โทรเลย',
    // TODO: ใส่เบอร์โทรจริง
    href: 'tel:+6620000000',
  },
  {
    id: 'messenger',
    icon: 'messenger',
    title: 'Facebook Messenger',
    description: 'ทักแชทผ่านเพจ Facebook อย่างเป็นทางการของเรา',
    ctaLabel: 'ส่งข้อความ',
    // TODO: ใส่ Facebook Page ID/username จริง
    href: 'https://m.me/prosperous',
  },
  {
    id: 'email',
    icon: 'email',
    title: 'อีเมล',
    description: 'ส่งรายละเอียดคำขอ ใบเสนอราคา หรือเอกสารถึงเราทางอีเมล',
    ctaLabel: 'ส่งอีเมล',
    // TODO: ใส่อีเมลจริง
    href: 'mailto:info@prosperous.co.th',
  },
];