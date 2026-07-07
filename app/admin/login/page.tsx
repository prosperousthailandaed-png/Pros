// app/admin/login/page.tsx
import { loginAction } from './actions';

export const metadata = { title: 'เข้าสู่ระบบแอดมิน | Prosperous' };

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 24, fontSize: 24 }}>เข้าสู่ระบบแอดมิน</h1>
      <form
        action={loginAction}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          required
          autoFocus
          style={{
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 6,
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: 10, cursor: 'pointer' }}
        >
          เข้าสู่ระบบ
        </button>
        {error && <p style={{ color: 'red', margin: 0 }}>รหัสผ่านไม่ถูกต้อง</p>}
      </form>
    </div>
  );
}