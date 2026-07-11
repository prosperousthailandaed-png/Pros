// app/admin/login/page.tsx
'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="admin-login">
      <form action={formAction} className="admin-login-form">
        <h1>เข้าสู่ระบบแอดมิน</h1>
        {state?.error && <p className="admin-login-error">{state.error}</p>}
        <input type="email" name="email" placeholder="อีเมล" required autoComplete="username" />
        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={pending}>
          {pending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}