<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>เกี่ยวกับเรา | Prosperous Rescue Swimming</title>
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

  /* ===== hero ===== */
  .hero{position:relative;background:var(--ink);color:#fff;overflow:hidden}
  .hero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 420px at 84% -10%,rgba(200,16,46,.40),transparent 60%)}
  .hero .wrap{position:relative;padding:92px 30px 104px}
  @media(max-width:680px){.hero .wrap{padding:60px 22px 76px}}
  .hero .eyebrow{color:#ff8a9b}.hero .eyebrow::before{background:#ff8a9b}
  .hero h1{color:#fff;font-size:clamp(34px,6vw,60px);font-weight:700;letter-spacing:-.5px;margin-top:18px;max-width:15ch}
  .hero h1 .hl{color:#ff6678}
  .hero p.lead{margin-top:20px;max-width:600px;font-size:clamp(15px,2.3vw,18px);color:#c7ccd5;font-weight:300}
  .ecg{position:absolute;left:0;right:0;bottom:30px;width:100%;opacity:.5}
  .ecg path{fill:none;stroke:#ff6678;stroke-width:2.2;stroke-dasharray:1600;stroke-dashoffset:1600;animation:draw 3s ease-out .3s forwards}
  @keyframes draw{to{stroke-dashoffset:0}}

  section{padding:84px 0}
  @media(max-width:680px){section{padding:56px 0}}
  .mist{background:var(--mist)}
  h2.sec{font-size:clamp(26px,4vw,38px);font-weight:700;letter-spacing:-.4px;margin-top:16px}

  .who p{font-size:clamp(16px,2.1vw,18.5px);color:var(--slate);line-height:2}
  .story-title{font-size:clamp(22px,3.4vw,30px);font-weight:600;color:var(--ink);border-left:4px solid var(--red);padding-left:20px;margin:6px 0 28px;line-height:1.4}
  .story p{margin-bottom:20px;color:var(--slate)}
  .story p .em{color:var(--ink);font-weight:600}
  .pull{color:var(--red-dark);font-weight:600}

  .vision-card{background:var(--ink);color:#fff;border-radius:20px;padding:48px;position:relative;overflow:hidden}
  .vision-card::after{content:"";position:absolute;right:-40px;bottom:-40px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(200,16,46,.5),transparent 70%)}
  .vision-card .eyebrow{color:#ff8a9b}.vision-card .eyebrow::before{background:#ff8a9b}
  .vision-card h3{color:#fff;font-size:clamp(22px,3vw,30px);font-weight:600;margin-top:14px;position:relative;line-height:1.5}
  @media(max-width:680px){.vision-card{padding:32px 26px}}

  .mission{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:40px}
  @media(max-width:760px){.mission{grid-template-columns:1fr}}
  .m-item{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:30px 28px;transition:transform .25s,box-shadow .25s,border-color .25s}
  .m-item:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,22,26,.08);border-color:#d8b3ba}
  .m-num{font-family:'Anuphan';font-weight:700;font-size:15px;color:#fff;background:var(--red);width:34px;height:34px;border-radius:9px;display:grid;place-items:center;margin-bottom:16px}
  .m-item h4{font-size:18.5px;font-weight:600;margin-bottom:3px}
  .m-item .en{font-size:12.5px;letter-spacing:.04em;color:var(--red);text-transform:uppercase;font-weight:600;margin-bottom:12px;font-family:'Anuphan'}
  .m-item p{font-size:14.5px;color:var(--slate);line-height:1.85}

  .prosper-word{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(6px,2vw,20px);margin:26px 0 8px}
  .prosper-word span{font-family:'Anuphan';font-weight:700;font-size:clamp(34px,8vw,72px);color:var(--line)}
  .values{display:grid;grid-template-columns:1fr;gap:20px;margin-top:46px;max-width:760px;margin-left:auto;margin-right:auto}
  .v-card{display:flex;gap:22px;background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:28px;transition:border-color .25s,box-shadow .25s}
  .v-card:hover{border-color:var(--red);box-shadow:0 14px 34px rgba(200,16,46,.10)}
  .v-letter{flex:0 0 auto;width:60px;height:60px;border-radius:14px;background:var(--red-wash);color:var(--red);font-family:'Anuphan';font-weight:700;font-size:30px;display:grid;place-items:center}
  .v-card h4{font-size:18px;font-weight:600;margin-bottom:2px}
  .v-card .en{font-size:12px;letter-spacing:.05em;color:var(--red);text-transform:uppercase;font-weight:600;font-family:'Anuphan'}
  .v-card p{font-size:14.5px;color:var(--slate);line-height:1.8;margin-top:9px}

  .finale{background:var(--ink);color:#fff;position:relative;overflow:hidden}
  .finale::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 380px at 15% 120%,rgba(200,16,46,.42),transparent 60%)}
  .finale .narrow{position:relative;text-align:center}
  .finale .big-r{font-family:'Anuphan';font-weight:700;font-size:clamp(60px,16vw,150px);color:rgba(255,255,255,.05);line-height:.8;letter-spacing:.1em}
  .finale h3{color:#fff;font-size:clamp(20px,3vw,28px);font-weight:600;line-height:1.7;margin-top:-26px;position:relative}
  .finale .quote{font-size:clamp(16px,2.4vw,19px);color:#d7dbe2;font-weight:300;line-height:2;margin-top:24px}
  .finale .quote .em{color:#ff8a9b;font-weight:500}

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
      <a href="#">ติดต่อเรา</a> -->
    </nav>

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
    <a href="index.html">หน้าหลัก</a>
    <a href="#">สินค้า &amp; หลักสูตร</a>
    <a href="#">บริการครบวงจร</a>
    <a href="#">จงทำดี</a>
    <a href="about.html" class="on">เกี่ยวกับเรา</a>
    <a href="#">ข่าวสาร</a>
    <a href="#">ติดต่อเรา</a>
  </div>
</header>

<!-- hero -->
<section class="hero" style="padding:0"><div class="wrap">
  <span class="eyebrow">เกี่ยวกับเรา · About Us</span>
  <h1>เปลี่ยนทุกวินาทีวิกฤต<br>ให้เป็น<span class="hl">โอกาสรอดชีวิต</span></h1>
  <p class="lead">โพรสเพอรัส — ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร พร้อมส่งต่อองค์ความรู้การกู้ชีพสู่ทุกคนในสังคม</p>
  <svg class="ecg" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 H420 l18 -22 l20 44 l16 -52 l22 60 l18 -30 H720 l16 -16 l14 30 l12 -14 H1200"/></svg>
</div></section>

<!-- who -->
<section class="who"><div class="narrow reveal">
  <span class="eyebrow">เราเป็นใคร · Who We Are</span>
  <h2 class="sec">ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิต</h2>
  <p style="margin-top:24px">โพรสเพอรัส คือผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร เราเป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล พร้อมมุ่งมั่นส่งต่อองค์ความรู้ผ่านหลักสูตรฝึกอบรม การปฐมพยาบาล และการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ตามมาตรฐาน AHA (American Heart Association) เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม</p>
</div></section>

<!-- story -->
<section class="mist story"><div class="narrow reveal">
  <span class="eyebrow">เรื่องราวของเรา · Our Story</span>
  <p class="story-title">“เริ่มต้นจากความสูญเสีย... สู่ภารกิจปกป้องทุกหัวใจ”</p>
  <p>จุดเริ่มต้นของ บริษัท โพรสเพอรัส เกิดขึ้นจากภาพจำที่เปลี่ยนชีวิตของ <span class="em">คุณเพ็ญธรฯ</span> และเพื่อนสนิทสมัยเรียน ศิษย์เก่าด้านกายภาพบำบัด จากมหาวิทยาลัยมหิดล ในฐานะคนที่เรียนมาเพื่อฟื้นฟูชีวิตมนุษย์ ไม่มีอะไรจะเจ็บปวดไปกว่าการได้เห็นคนเสียชีวิตจากอาการหัวใจล้มเหลวเฉียบพลัน ทั้งในออฟฟิศที่ทำงาน และในสนามกีฬาที่ทุกคนควรจะแข็งแรง</p>
  <p>ภาพของความตื่นตระหนก มือที่สั่นเทาของผู้คนรอบข้าง และความจริงอันโหดร้ายที่ว่า <span class="pull">“ในนาทีวิกฤตนั้น ไม่มีใครเข้าถึงเครื่อง AED และไม่มีใครรู้วิธีใช้งานมันเลย”</span> กลายเป็นเรื่องที่ทำให้คุณเพ็ญธรฯ และเพื่อนตระหนักว่า ลำพังเพียงความรู้ในห้องเรียนไม่ใช่อาวุธที่เพียงพอ หากผู้คนในสังคมยังขาดแคลนเครื่องมือช่วยชีวิต</p>
  <p>จากเดิมที่เริ่มต้นธุรกิจด้วยการจำหน่ายอุปกรณ์ทางกายภาพ จึงได้ปลุกอุดมการณ์ของคุณเพ็ญธรฯ และเพื่อนในเรื่องใหม่ “โพรสเพอรัส” จึงไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์ แต่ <span class="em">“โพรสเพอรัส” คือสะพานเชื่อมต่อความปลอดภัย</span> ที่มุ่งมั่นนำเข้าและส่งมอบเครื่อง AED ที่มีมาตรฐาน พร้อมทั้งส่งต่อความรู้ ความเข้าใจ ในการกู้ชีพขั้นพื้นฐาน</p>
  <p>เพราะ “โพรสเพอรัส” เชื่อว่า <span class="em">'วินาทีชีวิต' ของทุกคนมีความหมาย</span> และจะไม่ยอมให้ใครต้องสูญเสียคนที่รักไป... เพียงเพราะคำว่า เข้าไม่ถึงอุปกรณ์ และขาดความรู้ ความเข้าใจอีกต่อไป</p>
</div></section>

<!-- direction -->
<section><div class="narrow">
  <div class="reveal" style="text-align:center">
    <span class="eyebrow center">ทิศทางองค์กร · Our Direction</span>
    <h2 class="sec">วิสัยทัศน์และพันธกิจ</h2>
  </div>
  <div class="vision-card reveal" style="margin-top:42px">
    <span class="eyebrow">วิสัยทัศน์ · Vision</span>
    <h3>“เป็นผู้นำด้านนวัตกรรมช่วยชีวิตและบริการกู้ชีพแบบครบวงจร ที่สังคมไว้วางใจ เพื่อเปลี่ยนทุกวินาทีวิกฤตให้เป็นโอกาสรอดชีวิตอย่างยั่งยืน”</h3>
  </div>
  <div class="reveal" style="margin-top:54px">
    <span class="eyebrow">พันธกิจ · Mission</span>
    <h3 style="font-size:22px;font-weight:600;margin-top:12px;color:var(--ink)">ภารกิจหลักที่ขับเคลื่อนเพื่อบรรลุวิสัยทัศน์</h3>
  </div>
  <div class="mission">
    <div class="m-item reveal"><div class="m-num">1</div><h4>สรรหานวัตกรรมทางการแพทย์ระดับโลก</h4><div class="en">World-Class Innovation</div><p>มุ่งมั่นเป็นตัวแทนจำหน่ายอุปกรณ์กายภาพและอุปกรณ์กู้ชีพมาตรฐานสากล อาทิ เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ (AED) แบรนด์ Acoresmed และเครื่องนวดหัวใจอัตโนมัติ (Auto CPR) จาก Michigan Instrument เพื่อให้คนไทยเข้าถึงเทคโนโลยีช่วยชีวิตที่ดีที่สุด</p></div>
    <div class="m-item reveal"><div class="m-num">2</div><h4>ยกระดับความรู้สู่มาตรฐานสากล</h4><div class="en">Standardized Training</div><p>ส่งเสริมและเปิดหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ที่ได้มาตรฐานสากลของสมาคมแพทย์โรคหัวใจแห่งอเมริกา (AHA) เพื่อสร้างผู้ปฏิบัติการที่เชี่ยวชาญและมั่นใจในสถานการณ์จริง</p></div>
    <div class="m-item reveal"><div class="m-num">3</div><h4>พิทักษ์ความปลอดภัยทางน้ำ</h4><div class="en">Maritime Rescue Excellence</div><p>สนับสนุนและขับเคลื่อน ชมรมกู้ภัยทางน้ำทางทะเล ภายใต้การบริหารงานโดย นาวาตรี ดร.ฐาพล สมสกุล ในการส่งต่อองค์ความรู้และทักษะการช่วยชีวิตทางน้ำชั้นสูงในภาวะฉุกเฉิน</p></div>
    <div class="m-item reveal"><div class="m-num">4</div><h4>ขับเคลื่อนสังคมและลดความสูญเสีย</h4><div class="en">Social Responsibility &amp; CSR</div><p>มุ่งมั่นดำเนินกิจกรรมเพื่อสังคม (CSR) เป็นแกนกลางระดมงบประมาณและทรัพยากรจากภายนอก เพื่อจัดฝึกอบรมการกู้ชีพและการป้องกันอุบัติภัยทางน้ำให้แก่หน่วยงานทหาร ทหารเรือ และหน่วยงานภาครัฐ ลดอัตราการสูญเสียจากการจมน้ำอย่างเป็นรูปธรรม</p></div>
  </div>
</div></section>

<!-- core values -->
<section class="mist"><div class="wrap">
  <div class="reveal" style="text-align:center">
    <span class="eyebrow center">คุณค่าหลักขององค์กร · Core Values</span>
    <h2 class="sec">P · R · O · S · P · E · R</h2>
    <div class="prosper-word"><span>P</span><span>R</span><span>O</span><span>S</span><span>P</span><span>E</span><span>R</span></div>
  </div>
  <div class="values">
    <div class="v-card reveal"><div class="v-letter">P</div><div><div class="en">Professionalism</div><h4>ความเป็นมืออาชีพ</h4><p>เราส่งมอบเฉพาะอุปกรณ์การแพทย์ระดับโลก เช่น AED แบรนด์ Acoresmed และ Auto CPR จาก Michigan ควบคู่ไปกับการฝึกอบรมตามมาตรฐานสากล AHA</p></div></div>
    <div class="v-card reveal"><div class="v-letter">R</div><div><div class="en">Rescue Excellence</div><h4>ความเป็นเลิศด้านการกู้ชีพและกู้ภัย</h4><p>เราไม่เพียงแต่สอนทฤษฎี แต่เราสร้าง “ทักษะที่ใช้ได้จริงในวิกฤต” ทั้งบนบกและทางน้ำ</p></div></div>
    <div class="v-card reveal"><div class="v-letter">O</div><div><div class="en">Outreach for Society</div><h4>การเข้าถึงและช่วยเหลือสังคม</h4><p>เราขยายโอกาสการเข้าถึงอุปกรณ์และความรู้ไปยังพื้นที่หรือหน่วยงานที่ขาดแคลน ผ่านกิจกรรม CSR</p></div></div>
    <div class="v-card reveal"><div class="v-letter">S</div><div><div class="en">Safety First</div><h4>ความปลอดภัยเป็นหัวใจสูงสุด</h4><p>ทุกผลิตภัณฑ์ ทุกหลักสูตร และทุกการปฏิบัติงานของเรา มีเป้าหมายเดียวคือการลดการสูญเสีย และป้องกันการเกิดอุบัติภัยซ้ำซ้อน</p></div></div>
    <div class="v-card reveal"><div class="v-letter">P</div><div><div class="en">Passion for Life</div><h4>ความมุ่งมั่นเพื่อคุณค่าของทุกชีวิต</h4><p>เราทำงานด้วยใจที่เชื่อว่า “ทุกวินาทีชีวิตมีคำว่าโอกาสซ่อนอยู่” และเราจะไม่ยอมแพ้ต่อข้อจำกัดใด ๆ</p></div></div>
    <div class="v-card reveal"><div class="v-letter">E</div><div><div class="en">Education &amp; Empowerment</div><h4>การศึกษาและการสร้างพลัง</h4><p>เราเชื่อในการส่งต่อองค์ความรู้ที่ถูกต้องเพื่อขจัดความกลัว และเปลี่ยนคนธรรมดาให้กลายเป็น “ผู้ช่วยชีวิต”</p></div></div>
    <div class="v-card reveal" style="grid-column:1/-1"><div class="v-letter">R</div><div><div class="en">Responsibility &amp; Reliability</div><h4>ความรับผิดชอบและความน่าเชื่อถือ</h4><p>เราเป็นองค์กรที่สังคมและหน่วยงานภาครัฐ / ความมั่นคง มอบความไว้วางใจให้ดูแลชีวิตและความปลอดภัย</p></div></div>
  </div>
</div></section>

<!-- finale -->
<section class="finale"><div class="narrow reveal">
  <div class="big-r">PROSPER</div>
  <h3>นิยามความหมายชื่อของบริษัท</h3>
  <p class="quote">“เราไม่ได้มุ่งหวังเพียงแค่ความเจริญรุ่งเรืองในทางธุรกิจเท่านั้น แต่ <span class="em">PROSPER</span> ของเรา คือการทำให้ <span class="em">‘ชีวิตและความปลอดภัยของคนในสังคม เจริญงอกงามและมั่นคงขึ้น’</span> ด้วยนวัตกรรมการช่วยชีวิตและการส่งต่อความรู้ที่ถูกต้อง เพื่อให้ทุกหัวใจได้มีโอกาสเติบโตและแข็งแรงต่อไป”</p>
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