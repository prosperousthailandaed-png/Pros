'use client';

// components/admin/ArticleContentEditor.tsx
// แก้ไขเนื้อหาบทความแบบ block: ย่อหน้า/รูปภาพ เรียงสลับกันได้ตามลำดับที่ต้องการ
// ใช้ใน form ของ app/admin/new และ app/admin/[slug]/edit
// ต้องอยู่ภายใน <form action={createArticleAction / updateArticleAction}> เดิม
// ค่าที่กรอกจะถูกเก็บลง hidden input name="content_blocks_json" ให้ server action อ่านต่อ

import { useState } from 'react';
import { uploadArticleImageAction } from '@/app/admin/actions';
import type { ContentBlock } from '@/lib/data/articles';

interface Props {
  initialBlocks?: ContentBlock[];
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
  padding: 12,
  border: '1px solid #e4e6ea',
  borderRadius: 8,
  marginBottom: 10,
};

const textareaStyle: React.CSSProperties = {
  flex: 1,
  padding: 8,
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 15,
  fontFamily: 'inherit',
};

const btnStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: 13,
  border: '1px solid #ccc',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
};

export default function ArticleContentEditor({ initialBlocks = [] }: Props) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  function update(index: number, block: ContentBlock) {
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));
  }

  function remove(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addParagraph() {
    setBlocks((prev) => [...prev, { type: 'paragraph', text: '' }]);
  }

  function addImage() {
    setBlocks((prev) => [...prev, { type: 'image', url: '', caption: '' }]);
  }

  async function handleFileChange(index: number, file: File | null) {
    if (!file) return;
    setUploadingIndex(index);
    try {
      const fd = new FormData();
      fd.set('file', file);
      const result = await uploadArticleImageAction(fd);
      if ('error' in result) {
        alert('อัพโหลดรูปไม่สำเร็จ: ' + result.error);
      } else {
        update(index, {
          type: 'image',
          url: result.url,
          caption: (blocks[index] as { caption?: string }).caption ?? '',
        });
      }
    } finally {
      setUploadingIndex(null);
    }
  }

  return (
    <div>
      <input type="hidden" name="content_blocks_json" value={JSON.stringify(blocks)} />

      {blocks.map((block, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button type="button" style={btnStyle} onClick={() => move(i, -1)}>↑</button>
            <button type="button" style={btnStyle} onClick={() => move(i, 1)}>↓</button>
            <button type="button" style={{ ...btnStyle, color: '#c8102e' }} onClick={() => remove(i)}>
              ลบ
            </button>
          </div>

          {block.type === 'paragraph' ? (
            <textarea
              value={block.text}
              onChange={(e) => update(i, { type: 'paragraph', text: e.target.value })}
              rows={4}
              placeholder="ข้อความย่อหน้า..."
              style={textareaStyle}
            />
          ) : (
            <div style={{ flex: 1 }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(i, e.target.files?.[0] ?? null)}
              />
              {uploadingIndex === i && <p style={{ fontSize: 13, color: '#888' }}>กำลังอัพโหลด...</p>}
              {block.url && (
                <img
                  src={block.url}
                  alt=""
                  style={{ maxWidth: 220, marginTop: 8, borderRadius: 6, display: 'block' }}
                />
              )}
              <input
                type="text"
                value={block.caption ?? ''}
                onChange={(e) => update(i, { ...block, caption: e.target.value })}
                placeholder="คำบรรยายใต้ภาพ (ไม่บังคับ)"
                style={{ ...textareaStyle, marginTop: 8 }}
              />
            </div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button type="button" style={btnStyle} onClick={addParagraph}>
          + เพิ่มย่อหน้า
        </button>
        <button type="button" style={btnStyle} onClick={addImage}>
          + เพิ่มรูปภาพ
        </button>
      </div>
    </div>
  );
}