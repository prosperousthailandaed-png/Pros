// app/admin/new/page.tsx
import { createArticleAction } from '../actions';

export const metadata = { title: 'สร้างบทความใหม่ | Admin' };

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: 8,
  marginTop: 4,
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 15,
};

export default function NewArticlePage() {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 24, fontSize: 24 }}>สร้างบทความใหม่</h1>
      <form
        action={createArticleAction}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <label>
          Slug (ใช้ในลิงก์ เช่น cpr-basic-guide — ใช้ตัวเล็ก a-z, 0-9, ขีดกลางเท่านั้น)
          <input name="slug" required pattern="[a-z0-9\-]+" style={inputStyle} />
        </label>
        <label>
          ชื่อบทความ
          <input name="title" required style={inputStyle} />
        </label>
        <label>
          บทคัดย่อ
          <textarea name="excerpt" required rows={2} style={inputStyle} />
        </label>
        <label>
          เนื้อหา (แบ่งพารากราฟด้วยการเว้นบรรทัดว่าง 1 บรรทัด)
          <textarea name="content" rows={10} style={inputStyle} />
        </label>
        <label>
          รูปปก
          <input type="file" name="cover_file" accept="image/*" style={{ marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="published" /> เผยแพร่ทันที
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: 10, cursor: 'pointer' }}
        >
          บันทึก
        </button>
      </form>
    </div>
  );
}
