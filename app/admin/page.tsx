// app/admin/page.tsx
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { deleteArticleAction } from './actions';
import { logoutAction } from './login/actions';

export const metadata = { title: 'จัดการบทความ | Admin' };
export const dynamic = 'force-dynamic'; // ต้องเห็นข้อมูลล่าสุดเสมอ ไม่ cache

export default async function AdminPage() {
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('slug, title, published, updated_at')
    .order('updated_at', { ascending: false });

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 24 }}>จัดการบทความ</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/admin/new" className="btn btn-primary">
            + บทความใหม่
          </Link>
          <form action={logoutAction}>
            <button type="submit" style={{ cursor: 'pointer' }}>
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>โหลดข้อมูลไม่สำเร็จ: {error.message}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: 8 }}>ชื่อบทความ</th>
            <th style={{ padding: 8 }}>slug</th>
            <th style={{ padding: 8 }}>สถานะ</th>
            <th style={{ padding: 8 }}></th>
          </tr>
        </thead>
        <tbody>
          {(articles ?? []).map((a) => (
            <tr key={a.slug} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{a.title}</td>
              <td style={{ padding: 8, color: '#888' }}>{a.slug}</td>
              <td style={{ padding: 8 }}>
                {a.published ? '✅ เผยแพร่แล้ว' : '📝 draft'}
              </td>
              <td style={{ padding: 8 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href={`/admin/${a.slug}/edit`} className="link-more">
                    แก้ไข
                  </Link>
                  <form action={deleteArticleAction}>
                    <input type="hidden" name="slug" value={a.slug} />
                    <button
                      type="submit"
                      style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                      ลบ
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {(articles ?? []).length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 16, textAlign: 'center', color: '#888' }}>
                ยังไม่มีบทความ
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}