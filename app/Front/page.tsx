<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>หน้าหลัก | Prosperous Rescue Swimming</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --red:#C8102E;--red-dark:#A00D24;--red-wash:#FBEDEF;
    --black:#0B0C0E;--ink:#14161A;
    --slate:#44474E;--muted:#868B94;
    --paper:#FFFFFF;--mist:#F4F5F7;--line:#E4E6EA;
    --line-d:rgba(255,255,255,.14);--txt-d:#d4d7dd;--muted-d:#9499a2;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'IBM Plex Sans Thai',sans-serif;color:var(--slate);background:var(--paper);line-height:1.85;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  h1,h2,h3,h4{font-family:'Anuphan',sans-serif;color:var(--ink);line-height:1.25}
  a{text-decoration:none;color:inherit}
  .wrap{max-width:1180px;margin:0 auto;padding:0 30px}
  .narrow{max-width:840px;margin:0 auto;padding:0 40px}
  @media(max-width:680px){.narrow{padding:0 22px}.wrap{padding:0 22px}}
  .eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--red);font-family:'Anuphan'}
  .eyebrow::before{content:"";width:26px;height:2px;background:var(--red)}
  .eyebrow.center{justify-content:center}

  /* ===== Navbar A (black) ===== */
  .nav{position:sticky;top:0;z-index:60;background:var(--black)}
  .nav .row{display:flex;align-items:center;gap:18px;height:76px}
  .logo{display:flex;align-items:center;gap:11px}
  .logo .chip{width:40px;height:40px;border-radius:11px;background:var(--red);display:grid;place-items:center;color:#fff}
  .logo .wm{font-family:'Anuphan';font-weight:700;font-size:21px;color:#fff;letter-spacing:-.3px;line-height:1}
  .logo .sub{font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-d);display:block;margin-top:2px}
  .srch{width:40px;height:40px;border-radius:50%;border:1px solid var(--line-d);display:grid;place-items:center;color:#fff;background:transparent;cursor:pointer;transition:.2s;flex:none}
  .srch:hover{background:var(--red);border-color:var(--red)}
  .menu{display:flex;align-items:center;gap:3px;margin-left:auto}
  .menu a{color:var(--txt-d);font-size:14px;font-weight:500;padding:8px 12px;border-radius:7px;display:flex;align-items:center;gap:5px;white-space:nowrap;transition:color .2s}
  .menu a:hover{color:#fff}.menu a.on{color:var(--red)}
  .menu a .car{width:10px;height:10px;opacity:.6}
  .right{display:flex;align-items:center;gap:15px;padding-left:16px;border-left:1px solid var(--line-d)}
  .lang{display:flex;align-items:center;gap:6px;color:var(--txt-d);font-size:13.5px;font-weight:500;cursor:pointer}
  .socials{display:flex;gap:8px}
  .socials a{width:34px;height:34px;border:1px solid var(--line-d);border-radius:8px;display:grid;place-items:center;color:#cfd2d8;transition:.2s}
  .socials a:hover{background:var(--red);border-color:var(--red);color:#fff}
  .burger{display:none;margin-left:auto;width:42px;height:42px;border:1px solid var(--line-d);border-radius:9px;background:transparent;color:#fff;place-items:center;cursor:pointer}
  @media(max-width:1040px){.menu,.right{display:none}.burger{display:grid}}
  .mpanel{display:none;background:#0f1013;border-top:1px solid var(--line-d)}
  .mpanel.open{display:block}
  .mpanel a{display:block;color:var(--txt-d);font-size:15px;padding:13px 30px;border-bottom:1px solid rgba(255,255,255,.06)}
  .mpanel a.on{color:var(--red)}

  /* ===== hero (with background video) ===== */
  .hero{position:relative;background:var(--ink);color:#fff;overflow:hidden;isolation:isolate}
  .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.55}
  .hero-scrim{position:absolute;inset:0;z-index:1;
    background:
      radial-gradient(900px 420px at 84% -10%,rgba(200,16,46,.45),transparent 60%),
      linear-gradient(180deg,rgba(11,12,14,.50),rgba(11,12,14,.82));}
  .hero .wrap{position:relative;z-index:2;padding:100px 30px 120px}
  @media(max-width:680px){.hero .wrap{padding:64px 22px 92px}}
  .hero .eyebrow{color:#ff8a9b}.hero .eyebrow::before{background:#ff8a9b}
  .hero h1{color:#fff;font-size:clamp(34px,6vw,62px);font-weight:700;letter-spacing:-.5px;margin-top:18px;max-width:16ch}
  .hero h1 .hl{color:#ff6678}
  .hero p.lead{margin-top:20px;max-width:600px;font-size:clamp(15px,2.3vw,18px);color:#c7ccd5;font-weight:300}
  .ctas{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px;position:relative;z-index:2}
  .btn{display:inline-flex;align-items:center;gap:8px;font-family:'Anuphan';font-weight:600;font-size:15px;padding:14px 30px;border-radius:11px;transition:.2s;cursor:pointer}
  .btn-primary{background:var(--red);color:#fff}
  .btn-primary:hover{background:var(--red-dark)}
  .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff}
  .btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08)}
  .ecg{position:absolute;left:0;right:0;bottom:30px;width:100%;opacity:.5}
  .ecg path{fill:none;stroke:#ff6678;stroke-width:2.2;stroke-dasharray:1600;stroke-dashoffset:1600;animation:draw 3s ease-out .3s forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
  @media(prefers-reduced-motion:reduce){.hero-video{display:none}}

  section{padding:84px 0}
  @media(max-width:680px){section{padding:56px 0}}
  .mist{background:var(--mist)}
  h2.sec{font-size:clamp(26px,4vw,38px);font-weight:700;letter-spacing:-.4px;margin-top:16px}
  .sec-head .sub{margin-top:14px;color:var(--slate);max-width:60ch}

  /* who */
  .who p{font-size:clamp(16px,2.1vw,18.5px);color:var(--slate);line-height:2;margin-top:24px}
  .who .more{margin-top:24px}

  /* link styles */
  .link-more{display:inline-flex;align-items:center;gap:7px;color:var(--red);font-weight:600;font-family:'Anuphan';font-size:15px}
  .link-more:hover{color:var(--red-dark)}
  .linknote{font-size:11px;color:var(--red);background:var(--red-wash);padding:2px 8px;border-radius:6px;font-weight:600;margin-left:8px;font-family:'Anuphan';letter-spacing:.02em}
  .ph{border:1px dashed var(--red);color:var(--red);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:500;display:inline-flex;gap:7px;align-items:center}
  .ph::before{content:"✎"}
  .img-ph{background:repeating-linear-gradient(45deg,#eef0f3 0 13px,#e6e8ec 13px 26px);color:var(--muted);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;text-align:center;padding:14px}

  /* product / focus cards */
  .pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:42px}
  @media(max-width:980px){.pgrid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:540px){.pgrid{grid-template-columns:1fr}}
  .pcard{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s,border-color .25s}
  .pcard:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(20,22,26,.10);border-color:#d8b3ba}
  .pcard .pic{height:170px}
  .pcard .pbody{padding:24px;display:flex;flex-direction:column;gap:9px;flex:1}
  .pcard .en{font-size:12px;letter-spacing:.05em;color:var(--red);text-transform:uppercase;font-weight:600;font-family:'Anuphan'}
  .pcard h4{font-size:18px;font-weight:600}
  .pcard p{font-size:14px;color:var(--slate);line-height:1.8}
  .pcard .foot{margin-top:auto;padding-top:6px}

  /* statement (dark) */
  .statement{background:var(--ink);color:#fff;position:relative;overflow:hidden;text-align:center}
  .statement::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 360px at 50% -20%,rgba(200,16,46,.42),transparent 62%)}
  .statement .narrow{position:relative}
  .statement .eyebrow{color:#ff8a9b}.statement .eyebrow::before{background:#ff8a9b}
  .statement h3{color:#fff;font-size:clamp(22px,3.4vw,32px);font-weight:600;line-height:1.5;margin-top:16px}
  .statement p{margin-top:22px;font-size:clamp(15px,2.3vw,18px);color:#d7dbe2;font-weight:300;line-height:2}
  .statement p .em{color:#ff8a9b;font-weight:500}

  /* courses (mission-style) */
  .cgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:42px}
  @media(max-width:760px){.cgrid{grid-template-columns:1fr}}
  .ccard{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:30px 28px;display:flex;gap:22px;transition:transform .25s,box-shadow .25s,border-color .25s}
  .ccard:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,22,26,.08);border-color:#d8b3ba}
  .c-num{flex:0 0 auto;width:44px;height:44px;border-radius:12px;background:var(--red);color:#fff;font-family:'Anuphan';font-weight:700;font-size:18px;display:grid;place-items:center}
  .ccard h4{font-size:17.5px;font-weight:600;line-height:1.5}
  .ccard .en{font-size:12px;letter-spacing:.04em;color:var(--red);text-transform:uppercase;font-weight:600;font-family:'Anuphan';margin-top:4px}
  .ccard .foot{margin-top:12px}

  /* news */
  .ngrid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:42px}
  @media(max-width:880px){.ngrid{grid-template-columns:1fr}}
  .ncard{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s,border-color .25s}
  .ncard:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,22,26,.08);border-color:#d8b3ba}
  .ncard .pic{height:160px}
  .ncard .nbody{padding:22px;display:flex;flex-direction:column;gap:12px;flex:1}
  .ncard h4{font-size:16px;font-weight:600;line-height:1.55}
  .ncard .foot{margin-top:auto}

  /* finale CTA (dark) */
  .finale{background:var(--ink);color:#fff;position:relative;overflow:hidden}
  .finale::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 380px at 50% 130%,rgba(200,16,46,.45),transparent 60%)}
  .finale .narrow{position:relative;text-align:center}
  .finale h2{color:#fff;font-size:clamp(24px,3.8vw,38px);font-weight:700;letter-spacing:-.3px;max-width:22ch;margin:0 auto}
  .finale p{margin-top:18px;max-width:52ch;margin-left:auto;margin-right:auto;color:#c7ccd5;font-weight:300}
  .finale .ctas{justify-content:center;margin-top:30px}

  footer{background:#0F1115;color:#7b818c;font-size:13px;padding:30px 0}
  footer .wrap{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}
  footer b{color:#fff;font-family:'Anuphan'}

  .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
  .reveal.in{opacity:1;transform:none}
  @media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}.ecg path{animation:none;stroke-dashoffset:0}html{scroll-behavior:auto}}
</style>
</head>
<body>

<!-- ===== Navbar A ===== -->
<header class="nav">
  <div class="wrap"><div class="row">
    <a class="logo" href="index.html">
      <span class="chip"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg></span>
      <span><span class="wm">Prosperous</span><span class="sub">Rescue Swimming</span></span>
    </a>
    <button class="srch" aria-label="ค้นหา"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></button>

    <nav class="menu">
      <a href="index.html" class="on">หน้าหลัก</a>
    <!--  <a href="#">สินค้า &amp; หลักสูตร <svg class="car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></a>
      <a href="#">บริการครบวงจร <svg class="car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></a>
      <a href="#">จงทำดี</a>-->
      <a href="about.html">เกี่ยวกับเรา <svg class="car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></a>
      <!--<a href="#">ข่าวสาร</a>
      <a href="#">ติดต่อเรา</a> >
    </nav> -->

    <div class="right">
      <span class="lang"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>ไทย</span>
      <div class="socials">
        <a href="#" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
        <a href="#" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8H4v11h2.5V8zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 19h-2.5v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.7 1.3-.1.2-.1.5-.1.8V19H9.5V8H12v1.5c.4-.6 1.1-1.4 2.7-1.4 2 0 3.3 1.3 3.3 4V19z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3-.4-4.3a2.6 2.6 0 0 0-1.8-1.8C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7C2 9 2 12 2 12s0 3 .4 4.3a2.6 2.6 0 0 0 1.8 1.8c1.3.4 7.8.4 7.8.4s6.5 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z"/></svg></a>
      </div>
    </div>

    <button class="burger" id="burger" aria-label="เมนู"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg></button>
  </div></div>

  <div class="mpanel" id="mpanel">
    <a href="index.html" class="on">หน้าหลัก</a>
    <a href="#">สินค้า &amp; หลักสูตร</a>
    <a href="#">บริการครบวงจร</a>
    <a href="#">จงทำดี</a>
    <a href="about.html">เกี่ยวกับเรา</a>
    <a href="#">ข่าวสาร</a>
    <a href="#">ติดต่อเรา</a>
  </div>
</header>

<!-- ===== hero ===== -->
<section class="hero" style="padding:0">
  <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="/img/hero-poster.jpg">
    <source src="/img/First.mp4" type="video/webm">
    <source src="/img/seconds.mp4" type="video/mp4">
  </video>
  <div class="hero-scrim"></div>
  <div class="wrap">
    <span class="eyebrow">มากกว่าผู้นำเข้า · Beyond a Distributor</span>
    <h1>มากกว่าผู้นำเข้า คือเรา<span class="hl">พร้อมเคียงข้างทุกชีวิต</span></h1>
    <p class="lead">โพรสเพอรัส — ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร พร้อมส่งต่อองค์ความรู้การกู้ชีพสู่ทุกคนในสังคม</p>
    <div class="ctas">
      <a href="#" class="btn btn-primary">ปรึกษาผู้เชี่ยวชาญ</a>
      <a href="#focus" class="btn btn-ghost">ดูสินค้า &amp; บริการ</a>""
    </div>
    <svg class="ecg" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 H420 l18 -22 l20 44 l16 -52 l22 60 l18 -30 H720 l16 -16 l14 30 l12 -14 H1200"/></svg>
  </div>
</section>

<!-- ===== who we are ===== -->
<section class="who"><div class="narrow reveal">
  <span class="eyebrow">เราเป็นใคร · Who We Are</span>
  <h2 class="sec">ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิต</h2>
  <p>โพรสเพอรัส เป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล พร้อมส่งต่อองค์ความรู้ผ่านหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ตามมาตรฐาน AHA เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม</p>
  <div class="more"><a href="about.html" class="link-more">รู้จักเราเพิ่มเติม →</a></div>
</div></section>

<!-- ===== focus / products ===== -->
<section class="mist" id="focus"><div class="wrap">
  <div class="sec-head reveal">
    <span class="eyebrow">สิ่งที่เราเชี่ยวชาญ · Our Focus</span>
    <h2 class="sec">สินค้าและบริการของเรา</h2>
    <p class="sub">นวัตกรรมช่วยชีวิตมาตรฐานสากล ครบทั้งอุปกรณ์ การฝึกอบรม และบริการกู้ภัย</p>
  </div>
  <div class="pgrid">

    <a href="#" class="pcard reveal">
        <img src="/img/a102_1.avif" alt="a102_1">
      <div class="pbody">
        <div class="en">AED</div>
        <h4>เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ</h4>
        <p>เครื่อง AED แบรนด์ Acoresmed มาตรฐานสากล ใช้งานง่าย พร้อมในทุกวินาทีวิกฤต</p>
        <div class="foot"><span class="link-more">ดูเพิ่มเติม →</span><span class="linknote">AED 2 รุ่น</span></div>
      </div>
    </a>

    <a href="#" class="pcard reveal">
        <img src="/img/autocpr.avif" alt="autocpr">
      <div class="pbody">
        <div class="en">AUTO CPR</div>
        <h4>เครื่องนวดหัวใจอัตโนมัติ</h4>
        <p>Auto CPR จาก Michigan Instrument ช่วยปั๊มหัวใจต่อเนื่องอย่างมีประสิทธิภาพในภาวะฉุกเฉิน</p>
        <div class="foot"><span class="link-more">ดูเพิ่มเติม →</span><span class="linknote">รูปใหญ่ + วิดีโอ</span></div>
      </div>
    </a>

    <a href="#" class="pcard reveal">
        <img src="/img/physio.avif" alt="physio">
      <div class="pbody">
        <div class="en">Physical Therapy</div>
        <h4>อุปกรณ์กายภาพบำบัด</h4>
        <p>อุปกรณ์ฟื้นฟูและกายภาพบำบัดสำหรับสถานพยาบาลและองค์กร <span class="ph">รอข้อความจริง</span></p>
        <div class="foot"><span class="link-more">ดูเพิ่มเติม →</span><span class="linknote">อุปกรณ์ทั้งหมด</span></div>
      </div>
    </a>

    <a href="#" class="pcard reveal">
        <img src="/img/swimmer.avif" alt="swimmer">
      <div class="pbody">
        <div class="en">Rescue Service</div>
        <h4>บริการกู้ภัย &amp; Lifeguard</h4>
        <p>ชมรมกู้ภัยทางน้ำทางทะเล และบริการเจ้าหน้าที่ความปลอดภัยทางน้ำสำหรับองค์กรและงานอีเวนต์</p>
        <div class="foot"><span class="link-more">ดูเพิ่มเติม →</span><span class="linknote">หน้าบริการ</span></div>
      </div>
    </a>

  </div>
</div></section>

<!-- ===== statement (dark) ===== -->
<section class="statement"><div class="narrow reveal">
  <span class="eyebrow center">คุณค่าของเรา · Our Promise</span>
  <h3>“มากกว่าผู้นำเข้า... คือเราพร้อมเคียงข้างทุกชีวิต”</h3>
  <p>เราไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์แพทย์ แต่เราขับเคลื่อนความปลอดภัยผ่านผู้เชี่ยวชาญในทุกมิติ เพื่อส่งต่อ <span class="em">‘คุณค่าแห่งการรอดชีวิต’</span> สู่การสร้าง <span class="em">‘พื้นที่ปลอดภัย’</span> ที่สมบูรณ์และยั่งยืน ให้กับเทศบาล บริษัท และโรงงาน</p>
</div></section>

<!-- ===== courses ===== -->
<section><div class="wrap">
  <div class="sec-head reveal">
    <span class="eyebrow">หลักสูตรฝึกอบรม · Training</span>
    <h2 class="sec">หลักสูตรของเรา</h2>
    <p class="sub">หลักสูตรมาตรฐานสากล AHA และการกู้ภัยทางน้ำ สอนทักษะที่ใช้ได้จริงในวิกฤต</p>
  </div>
  <div class="cgrid">
    <a href="#" class="ccard reveal"><div class="c-num">1</div><div><h4>หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง AED</h4><div class="en">CPR &amp; AED Training</div><div class="foot"><span class="link-more">รายละเอียด →</span></div></div></a>
    <a href="#" class="ccard reveal"><div class="c-num">2</div><div><h4>หลักสูตรนักกู้ภัยทางน้ำทางทะเล</h4><div class="foot"><span class="link-more">รายละเอียด →</span></div></div></a>
    <a href="#" class="ccard reveal"><div class="c-num">3</div><div><h4>หลักสูตรนักดำน้ำเพื่อการกู้ภัย</h4><div class="foot"><span class="link-more">รายละเอียด →</span></div></div></a>
    <a href="#" class="ccard reveal"><div class="c-num">4</div><div><h4>หลักสูตรการช่วยชีวิตผู้ประสบภัยทางน้ำ</h4><div class="en">Lifeguard Training</div><div class="foot"><span class="link-more">รายละเอียด →</span></div></div></a>
  </div>
  <div style="margin-top:28px"><a href="#" class="link-more">ดูหลักสูตรทั้งหมด →</a><span class="linknote">→ /courses</span></div>
</div></section>

<!-- ===== latest news ===== -->
<section class="mist"><div class="wrap">
  <div class="sec-head reveal">
    <span class="eyebrow">ข่าวสาร &amp; ความรู้ · Latest</span>
    <h2 class="sec">บทความล่าสุด</h2>
    <p class="sub">ดึงจากระบบบทความในแอดมินอัตโนมัติ</p>
  </div>
  <div class="ngrid">
    <a href="#" class="ncard reveal"><div class="pic img-ph">[ ปกบทความ 1 ]</div><div class="nbody"><h4 class="ph" style="border:none;padding:0;color:var(--red)">รอข้อมูลจริง — หัวข้อบทความ</h4><div class="foot"><span class="link-more">อ่านเพิ่มเติม →</span></div></div></a>
    <a href="#" class="ncard reveal"><div class="pic img-ph">[ ปกบทความ 2 ]</div><div class="nbody"><h4 class="ph" style="border:none;padding:0;color:var(--red)">รอข้อมูลจริง — หัวข้อบทความ</h4><div class="foot"><span class="link-more">อ่านเพิ่มเติม →</span></div></div></a>
    <a href="#" class="ncard reveal"><div class="pic img-ph">[ ปกบทความ 3 ]</div><div class="nbody"><h4 class="ph" style="border:none;padding:0;color:var(--red)">รอข้อมูลจริง — หัวข้อบทความ</h4><div class="foot"><span class="link-more">อ่านเพิ่มเติม →</span></div></div></a>
  </div>
  <div style="margin-top:28px"><a href="#" class="link-more">ดูบทความทั้งหมด →</a><span class="linknote">→ /articles</span></div>
</div></section>

<!-- ===== finale CTA ===== -->
<section class="finale"><div class="narrow reveal">
  <h2>พร้อมสร้าง “พื้นที่ปลอดภัย” ให้องค์กรของคุณแล้วหรือยัง?</h2>
  <p>ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโซลูชันความปลอดภัยที่เหมาะกับองค์กร โรงงาน หรือหน่วยงานของคุณ</p>
  <div class="ctas"><a href="#" class="btn btn-primary">ติดต่อเรา</a></div>
</div></section>

<footer><div class="wrap">
  <span>© 2568 <b>Prosperous</b> Rescue Swimming Co., Ltd.</span>
  <span>นวัตกรรมช่วยชีวิต · อบรม CPR &amp; AED · กู้ภัยทางน้ำ</span>
</div></footer>

<script>
  document.getElementById('burger').addEventListener('click',()=>document.getElementById('mpanel').classList.toggle('open'));
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i%4,3)*60)+'ms';io.observe(el)});
</script>
</body>
</html>