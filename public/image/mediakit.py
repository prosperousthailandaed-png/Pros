#!/usr/bin/env python3
"""
mediakit.py — บีบอัด / ย่อ-ขยาย / แปลงนามสกุล รูปภาพและวิดีโอ

รูปภาพ : ใช้ Pillow
วิดีโอ  : เรียก ffmpeg (ต้องติดตั้งไว้ใน PATH)

ตัวอย่าง:
  # บีบอัดรูปแบบ "ไม่เห็นความต่าง" (visually lossless) เป็น WebP
  python mediakit.py in.png -o out.webp -q 90

  # บีบอัดแบบ lossless จริง (ไฟล์ใหญ่กว่าแต่ไม่เสียข้อมูลเลย)
  python mediakit.py in.png -o out.png --lossless

  # ย่อขนาดเหลือกว้าง 1280 (สูงตามอัตราส่วน) แล้วแปลงเป็น jpg
  python mediakit.py photo.heic -o photo.jpg --resize 1280x

  # ขยาย 2 เท่า
  python mediakit.py icon.png -o icon_2x.png --resize 200%

  # บีบวิดีโอด้วย H.265 CRF 23 (คมแทบเท่าเดิม ไฟล์เล็กลงมาก)
  python mediakit.py clip.mov -o clip.mp4 --crf 23

  # บีบวิดีโอ + ย่อเป็น 720p + แปลงเป็น webm (AV1)
  python mediakit.py clip.mp4 -o clip.webm --resize x720 --codec av1

  # ทำทั้งโฟลเดอร์
  python mediakit.py ./photos/ -o ./out/ -q 85 --batch
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".tif",
             ".gif", ".heic", ".heif", ".avif"}
VIDEO_EXT = {".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v", ".flv", ".wmv", ".mpg"}

VIDEO_CODECS = {
    "h264": "libx264",
    "h265": "libx265",
    "av1":  "libsvtav1",   # เร็วกว่า libaom มาก; ถ้าไม่มีลองเปลี่ยนเป็น libaom-av1
    "vp9":  "libvp9",
}


# ───────────────────────── รูปภาพ ─────────────────────────
def parse_resize(spec, w, h):
    """แปลงสตริง resize เป็น (new_w, new_h). คืน None ถ้าไม่ระบุ"""
    if not spec:
        return None
    spec = spec.strip().lower()

    if spec.endswith("%"):                       # เช่น 50% / 200%
        scale = float(spec[:-1]) / 100.0
        return max(1, round(w * scale)), max(1, round(h * scale))

    if "x" in spec:                              # เช่น 1280x / x720 / 1920x1080
        sw, sh = spec.split("x", 1)
        if sw and not sh:                        # 1280x  -> ล็อกความกว้าง
            nw = float(sw); return round(nw), max(1, round(h * nw / w))
        if sh and not sw:                        # x720   -> ล็อกความสูง
            nh = float(sh); return max(1, round(w * nh / h)), round(nh)
        return round(float(sw)), round(float(sh)) # บังคับทั้งคู่
    
    raise ValueError(f"รูปแบบ --resize ไม่ถูกต้อง: {spec}")


def process_image(src, dst, quality, lossless, resize):
    from PIL import Image

    img = Image.open(src)

    # แก้การหมุนจาก EXIF + คงโปรไฟล์สี
    try:
        from PIL import ImageOps
        img = ImageOps.exif_transpose(img)
    except Exception:
        pass

    if resize:
        new_size = parse_resize(resize, *img.size)
        if new_size:
            img = img.resize(new_size, Image.LANCZOS)

    ext = dst.suffix.lower()
    params = {}

    if ext in (".jpg", ".jpeg"):
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGB")
        params.update(quality=quality, optimize=True,
                      progressive=True, subsampling=0)  # 4:4:4 เก็บสีคมสุด

    elif ext == ".webp":
        if lossless:
            params.update(lossless=True, quality=100, method=6)
        else:
            params.update(quality=quality, method=6)   # method=6 บีบดีสุด ช้าหน่อย

    elif ext == ".png":
        params.update(optimize=True)                   # PNG เป็น lossless อยู่แล้ว

    elif ext == ".avif":
        # ต้องมี pillow-avif-plugin
        params.update(quality=100 if lossless else quality)

    img.save(dst, **params)


# ───────────────────────── วิดีโอ ─────────────────────────
def build_ffmpeg(src, dst, crf, codec, lossless, resize, preset):
    vcodec = VIDEO_CODECS.get(codec, "libx265")
    cmd = ["ffmpeg", "-y", "-i", str(src), "-c:v", vcodec]

    if lossless:
        if codec == "h265":
            cmd += ["-x265-params", "lossless=1"]
        elif codec == "h264":
            cmd += ["-qp", "0"]
        else:
            cmd += ["-crf", "0"]
    else:
        if codec == "av1":
            cmd += ["-crf", str(crf), "-preset", "6"]      # svt-av1: 0=ช้าสุด 13=เร็วสุด
        elif codec == "vp9":
            cmd += ["-crf", str(crf), "-b:v", "0"]
        else:
            cmd += ["-crf", str(crf), "-preset", preset]

    if resize:
        # ffmpeg scale: ใช้ -2 เพื่อให้หารด้วย 2 ลงตัว (codec ส่วนใหญ่ต้องการ)
        if resize.endswith("%"):
            s = float(resize[:-1]) / 100.0
            vf = f"scale=iw*{s}:ih*{s}"
        else:
            sw, sh = (resize.lower().split("x") + [""])[:2]
            sw = sw or "-2"; sh = sh or "-2"
            vf = f"scale={sw}:{sh}"
        cmd += ["-vf", vf]

    # เสียง: คัดลอกถ้าได้ ไม่งั้นบีบเป็น AAC/Opus
    if dst.suffix.lower() == ".webm":
        cmd += ["-c:a", "libopus", "-b:a", "128k"]
    else:
        cmd += ["-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart"]

    cmd += [str(dst)]
    return cmd


def process_video(src, dst, crf, codec, lossless, resize, preset):
    cmd = build_ffmpeg(src, dst, crf, codec, lossless, resize, preset)
    subprocess.run(cmd, check=True)


# ───────────────────────── main ─────────────────────────
def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.1f}{u}"
        n /= 1024
    return f"{n:.1f}TB"


def handle_one(src, dst, args):
    ext_in = src.suffix.lower()
    dst.parent.mkdir(parents=True, exist_ok=True)
    before = src.stat().st_size

    if ext_in in IMAGE_EXT or dst.suffix.lower() in IMAGE_EXT:
        process_image(src, dst, args.quality, args.lossless, args.resize)
    elif ext_in in VIDEO_EXT or dst.suffix.lower() in VIDEO_EXT:
        process_video(src, dst, args.crf, args.codec, args.lossless,
                      args.resize, args.preset)
    else:
        print(f"ข้าม (ไม่รู้จักชนิดไฟล์): {src}", file=sys.stderr)
        return

    after = dst.stat().st_size
    pct = (1 - after / before) * 100 if before else 0
    print(f"{src.name} -> {dst.name}  {human(before)} -> {human(after)} "
          f"({pct:+.1f}%)")


def main():
    p = argparse.ArgumentParser(description="บีบอัด/ย่อ-ขยาย/แปลงนามสกุล รูปและวิดีโอ")
    p.add_argument("input", help="ไฟล์ หรือโฟลเดอร์ (ใช้ร่วม --batch)")
    p.add_argument("-o", "--output", required=True, help="ไฟล์ปลายทาง หรือโฟลเดอร์")
    p.add_argument("-q", "--quality", type=int, default=85,
                   help="คุณภาพรูป 1-100 (default 85; 90+ = แทบมองไม่ออก)")
    p.add_argument("--crf", type=int, default=23,
                   help="คุณภาพวิดีโอ (ยิ่งต่ำยิ่งคม) H.265~23 / AV1~30 / H.264~20")
    p.add_argument("--codec", default="h265", choices=VIDEO_CODECS.keys(),
                   help="ตัวเข้ารหัสวิดีโอ (default h265)")
    p.add_argument("--preset", default="slow",
                   help="ffmpeg preset (slow=บีบดีกว่า, fast=เร็วกว่า)")
    p.add_argument("--resize", help="เช่น 1280x / x720 / 1920x1080 / 50%% / 200%%")
    p.add_argument("--lossless", action="store_true",
                   help="บีบแบบไม่เสียข้อมูลเลย (ไฟล์ใหญ่กว่า)")
    p.add_argument("--batch", action="store_true", help="ประมวลผลทั้งโฟลเดอร์")
    args = p.parse_args()

    src = Path(args.input)
    out = Path(args.output)

    if args.batch or src.is_dir():
        out.mkdir(parents=True, exist_ok=True)
        out_ext = out.suffix.lower()      # ถ้า -o เป็นโฟลเดอร์จะว่าง
        files = [f for f in src.iterdir()
                 if f.suffix.lower() in IMAGE_EXT | VIDEO_EXT]
        for f in sorted(files):
            # คงนามสกุลเดิม เว้นแต่จะระบุ -o เป็นไฟล์เดี่ยว (ไม่ใช่กรณีนี้)
            dst = out / f.name
            try:
                handle_one(f, dst, args)
            except Exception as e:
                print(f"ผิดพลาด {f.name}: {e}", file=sys.stderr)
    else:
        handle_one(src, out, args)


if __name__ == "__main__":
    main()