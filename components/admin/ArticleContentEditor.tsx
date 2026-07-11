'use client';

// components/admin/ArticleFormEditor.tsx
// รวม title / excerpt / cover / content blocks ไว้ในที่เดียว
// มีแท็บสลับ "แก้ไข" กับ "ดูตัวอย่าง" (พรีวิวหน้าตาจริงแบบเดียวกับ /articles/[slug])
// สไตล์อยู่ใน globals.css ภายใต้คอมเมนต์ "Admin: Article Form Editor"

import { useEffect, useState } from 'react';
import { uploadArticleImageAction } from '@/app/admin/actions';
import type { ContentBlock } from '@/lib/data/articles';

interface Props {
  initialTitle?: string;
  initialExcerpt?: string;
  initialCoverUrl?: string;
  initialBlocks?: ContentBlock[];
  initialPublished?: boolean;
}

export default function ArticleFormEditor({
  initialTitle = '',
  initialExcerpt = '',
  initialCoverUrl,
  initialBlocks = [],
  initialPublished = false,
}: Props) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [published, setPublished] = useState(initialPublished);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | undefined>(initialCoverUrl);

  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // สร้าง preview URL ชั่วคราวเวลาเลือกไฟล์ปกใหม่
  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

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

  // นับลำดับต่อประเภท เช่น "ย่อหน้าที่ 1", "รูปภาพที่ 2"
  const typeCounters: Record<string, number> = {};
  function labelFor(block: ContentBlock) {
    typeCounters[block.type] = (typeCounters[block.type] ?? 0) + 1;
    return block.type === 'paragraph'
      ? `ย่อหน้าที่ ${typeCounters[block.type]}`
      : `รูปภาพที่ ${typeCounters[block.type]}`;
  }

  return (
    <div>
      {/* ===== แท็บสลับโหมด ===== */}
      <div className="aedit-tabs">
        <button
          type="button"
          onClick={() => setMode('edit')}
          className={`aedit-tab ${mode === 'edit' ? 'active' : ''}`}
        >
          ✏️ แก้ไข
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={`aedit-tab ${mode === 'preview' ? 'active' : ''}`}
        >
          👁️ ดูตัวอย่าง
        </button>
      </div>

      {/* ===== โหมดแก้ไข ===== */}
      <div className="aedit-panel" hidden={mode !== 'edit'}>
        <label>
          ชื่อบทความ
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="aedit-input"
          />
        </label>

        <label>
          บทคัดย่อ
          <textarea
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={2}
            className="aedit-input"
          />
        </label>

        <div>
          <p className="aedit-section-label">เนื้อหา</p>
          <p className="aedit-hint">
            เพิ่มย่อหน้าและรูปภาพสลับกันได้ตามลำดับที่ต้องการ ใช้ปุ่ม ↑ ↓ จัดลำดับ
            แล้วกด &quot;ดูตัวอย่าง&quot; ด้านบนเพื่อดูหน้าตาจริงก่อนบันทึก
          </p>

          <input type="hidden" name="content_blocks_json" value={JSON.stringify(blocks)} />

          {blocks.map((block, i) => (
            <div key={i} className="aedit-block">
              <div className={`aedit-block-header aedit-block-header--${block.type}`}>
                <span className={`aedit-badge aedit-badge--${block.type}`}>
                  {block.type === 'paragraph' ? '📝' : '🖼️'} {labelFor(block)}
                </span>
                <div className="aedit-block-actions">
                  <button type="button" className="aedit-btn" onClick={() => move(i, -1)} title="ย้ายขึ้น">
                    ↑
                  </button>
                  <button type="button" className="aedit-btn" onClick={() => move(i, 1)} title="ย้ายลง">
                    ↓
                  </button>
                  <button
                    type="button"
                    className="aedit-btn aedit-btn--remove"
                    onClick={() => remove(i)}
                  >
                    ลบ
                  </button>
                </div>
              </div>

              <div className="aedit-block-body">
                {block.type === 'paragraph' ? (
                  <textarea
                    value={block.text}
                    onChange={(e) => update(i, { type: 'paragraph', text: e.target.value })}
                    rows={4}
                    placeholder="ข้อความย่อหน้า..."
                    className="aedit-textarea"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(i, e.target.files?.[0] ?? null)}
                    />
                    {uploadingIndex === i && <p className="aedit-hint">กำลังอัพโหลด...</p>}
                    {block.url && (
                      <img src={block.url} alt="" className="aedit-block-image-preview" />
                    )}
                    <input
                      type="text"
                      value={block.caption ?? ''}
                      onChange={(e) => update(i, { ...block, caption: e.target.value })}
                      placeholder="คำบรรยายใต้ภาพ (ไม่บังคับ)"
                      className="aedit-textarea aedit-caption-input"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="aedit-add-row">
            <button type="button" className="aedit-btn aedit-add-btn--paragraph" onClick={addParagraph}>
              + เพิ่มย่อหน้า
            </button>
            <button type="button" className="aedit-btn aedit-add-btn--image" onClick={addImage}>
              + เพิ่มรูปภาพ
            </button>
          </div>
        </div>

        {coverPreviewUrl && (
          <div className="aedit-cover-preview">
            <p style={{ marginBottom: 8 }}>รูปปกปัจจุบัน:</p>
            <img src={coverPreviewUrl} alt="" />
          </div>
        )}
        <label>
          {initialCoverUrl ? 'เปลี่ยนรูปปก (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)' : 'รูปปก'}
          <input
            type="file"
            name="cover_file"
            accept="image/*"
            style={{ marginTop: 4 }}
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <label className="aedit-checkbox-row">
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          เผยแพร่
        </label>
      </div>

      {/* ===== โหมดดูตัวอย่าง — ใช้คลาสเดียวกับหน้า /articles/[slug] จริง ===== */}
      {mode === 'preview' && (
        <div className="aedit-preview-box">
          {coverPreviewUrl ? (
            <img src={coverPreviewUrl} alt={title} className="article-cover" />
          ) : (
            <div className="article-cover article-cover--ph">[ ปกบทความ ]</div>
          )}

          <p className="eyebrow tracking-normal">บทความ</p>
          <h1 className="tracking-normal">{title || 'ชื่อบทความ...'}</h1>
          <p className="article-meta">ตัวอย่างวันที่เผยแพร่</p>

          <div className="article-body aedit-preview-body">
            {blocks.length > 0 ? (
              blocks.map((block, i) =>
                block.type === 'image' ? (
                  <figure key={i} className="article-inline-figure">
                    {block.url ? (
                      <img src={block.url} alt={block.caption ?? ''} />
                    ) : (
                      <div className="aedit-preview-image-ph">[ ยังไม่ได้อัพโหลดรูป ]</div>
                    )}
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                ) : (
                  <p key={i}>
                    {block.text || <span className="aedit-preview-empty-text">(ย่อหน้าว่าง)</span>}
                  </p>
                )
              )
            ) : (
              <p className="aedit-preview-empty-block">
                ยังไม่มีเนื้อหา — สลับไปแท็บ &quot;แก้ไข&quot; เพื่อเพิ่ม
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}