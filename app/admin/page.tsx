// app/admin/page.tsx
import Link from 'next/link';
import { logoutAction } from './login/actions';

export const metadata = { title: 'แผงควบคุมแอดมิน | Admin' };

export default function AdminHomePage() {
  return (
    <div className="adminhub-wrap">
      <div className="adminhub-header">
        <h1 className="adminhub-title">แผงควบคุมแอดมิน</h1>
        <form action={logoutAction}>
          <button type="submit" className="adminhub-logout">
            ออกจากระบบ
          </button>
        </form>
      </div>

      <div className="adminhub-grid">
        <Link href="/admin/chat" className="adminhub-card">
          <div className="adminhub-card-icon">💬</div>
          <h2 className="adminhub-card-title">คุยกับลูกค้า</h2>
          <p className="adminhub-card-desc">
            ตอบแชทลูกค้าที่ทักเข้ามาจากหน้าเว็บแบบเรียลไทม์
          </p>
        </Link>

        <Link href="/admin/articles" className="adminhub-card">
          <div className="adminhub-card-icon">📰</div>
          <h2 className="adminhub-card-title">จัดการบทความ</h2>
          <p className="adminhub-card-desc">
            สร้าง แก้ไข ลบบทความ/ข่าวสาร และจัดการรูปภาพ
          </p>
        </Link>
      </div>
    </div>
  );
}