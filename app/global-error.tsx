'use client';

// app/global-error.tsx
// จับ error ที่หลุดขึ้นมาถึง root ของแอป — log ไว้ดูใน Vercel > Logs
// (ยังไม่ได้ต่อ Sentry/บริการ error tracking ภายนอก — อยากได้แจ้งเตือนแบบ real-time
//  ค่อยเพิ่ม Sentry ทีหลังได้ ต้องสมัครบัญชีแยกต่างหาก)

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <html lang="th">
      <body style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>เกิดข้อผิดพลาดบางอย่าง</h1>
        <p style={{ color: '#888', marginBottom: 24 }}>ทีมงานได้รับแจ้งเรื่องนี้แล้ว ลองรีเฟรชอีกครั้ง</p>
        <button onClick={() => reset()} style={{ padding: '10px 24px', cursor: 'pointer' }}>
          ลองอีกครั้ง
        </button>
      </body>
    </html>
  );
}