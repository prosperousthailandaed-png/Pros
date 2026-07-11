// app/admin/page.tsx
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { logoutAction } from './login/actions';

export const metadata = { title: 'แผงควบคุมแอดมิน | Admin' };

const cardStyle: CSSProperties = {
  display: 'block',
  padding: '2rem',
  border: '1px solid #e4e6ea',
  borderRadius: 16,
  textDecoration: 'none',
  color: 'inherit',
  transition: 'box-shadow 0.2s, transform 0.2s',
};

export default function AdminHomePage() {
  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontSize: 26 }}>แผงควบคุมแอดมิน</h1>
        <form action={logoutAction}>
          <button type="submit" style={{ cursor: 'pointer' }}>
            ออกจากระบบ
          </button>
        </form>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        <Link href="/admin/chat" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
          <h2 style={{ fontSize: 19, marginBottom: 6 }}>คุยกับลูกค้า</h2>
          <p style={{ color: '#888', fontSize: 14 }}>
            ตอบแชทลูกค้าที่ทักเข้ามาจากหน้าเว็บแบบเรียลไทม์
          </p>
        </Link>

        <Link href="/admin/articles" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📰</div>
          <h2 style={{ fontSize: 19, marginBottom: 6 }}>จัดการบทความ</h2>
          <p style={{ color: '#888', fontSize: 14 }}>
            สร้าง แก้ไข ลบบทความ/ข่าวสาร และจัดการรูปภาพ
          </p>
        </Link>
      </div>
    </div>
  );
}