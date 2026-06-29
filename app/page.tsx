import Link from 'next/link';

export const metadata = {
  title: 'หน้าหลัก | Prosperous Rescue Swimming',
};

export default function HomePage() {
  return (
    <div className="home">
      {/* hero */}
      <section className="hero" style={{ padding: 0 }}>
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="">
          <source src="/image/First.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="wrap">
          <span className="eyebrow">มากกว่าผู้นำเข้า · Beyond a Distributor</span>
          <h1>มากกว่าผู้นำเข้า คือเรา<span className="hl">พร้อมเคียงข้างทุกชีวิต</span></h1>
          <p className="lead">โพรสเพอรัส — ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร พร้อมส่งต่อองค์ความรู้การกู้ชีพสู่ทุกคนในสังคม</p>
          <div className="ctas">
            <a href="#" className="btn btn-primary">ปรึกษาผู้เชี่ยวชาญ</a>
            <a href="#focus" className="btn btn-ghost">ดูสินค้า &amp; บริการ</a>
          </div>
          <svg className="ecg" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 30 H420 l18 -22 l20 44 l16 -52 l22 60 l18 -30 H720 l16 -16 l14 30 l12 -14 H1200" />
          </svg>
        </div>
      </section>

      {/* who we are */}
      <section className="who">
        <div className="narrow reveal">
          <span className="eyebrow">เราเป็นใคร · Who We Are</span>
          <h2 className="sec">ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิต</h2>
          <p>โพรสเพอรัส เป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล พร้อมส่งต่อองค์ความรู้ผ่านหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ตามมาตรฐาน AHA เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม</p>
          <div className="more"><Link href="/about" className="link-more">รู้จักเราเพิ่มเติม →</Link></div>
        </div>
      </section>

      {/* focus / products */}
      <section className="mist" id="focus">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">สิ่งที่เราเชี่ยวชาญ · Our Focus</span>
            <h2 className="sec">สินค้าและบริการของเรา</h2>
            <p className="sub">นวัตกรรมช่วยชีวิตมาตรฐานสากล ครบทั้งอุปกรณ์ การฝึกอบรม และบริการกู้ภัย</p>
          </div>
          <div className="pgrid">
            <a href="#" className="pcard reveal">
              <img src="/image/a102_1.avif" alt="a102_1" />
              <div className="pbody">
                <div className="en">AED</div>
                <h4>เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ</h4>
                <p>เครื่อง AED แบรนด์ Acoresmed มาตรฐานสากล ใช้งานง่าย พร้อมในทุกวินาทีวิกฤต</p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">AED 2 รุ่น</span></div>
              </div>
            </a>

            <a href="#" className="pcard reveal">
              <img src="/image/autocpr.avif" alt="autocpr" />
              <div className="pbody">
                <div className="en">AUTO CPR</div>
                <h4>เครื่องนวดหัวใจอัตโนมัติ</h4>
                <p>Auto CPR จาก Michigan Instrument ช่วยปั๊มหัวใจต่อเนื่องอย่างมีประสิทธิภาพในภาวะฉุกเฉิน</p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">รูปใหญ่ + วิดีโอ</span></div>
              </div>
            </a>

            <a href="#" className="pcard reveal">
              <img src="/image/physio.avif" alt="physio" />
              <div className="pbody">
                <div className="en">Physical Therapy</div>
                <h4>อุปกรณ์กายภาพบำบัด</h4>
                <p>อุปกรณ์ฟื้นฟูและกายภาพบำบัดสำหรับสถานพยาบาลและองค์กร <span className="ph">รอข้อความจริง</span></p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">อุปกรณ์ทั้งหมด</span></div>
              </div>
            </a>

            <a href="#" className="pcard reveal">
              <img src="/image/swimmer.avif" alt="swimmer" />
              <div className="pbody">
                <div className="en">Rescue Service</div>
                <h4>บริการกู้ภัย &amp; Lifeguard</h4>
                <p>ชมรมกู้ภัยทางน้ำทางทะเล และบริการเจ้าหน้าที่ความปลอดภัยทางน้ำสำหรับองค์กรและงานอีเวนต์</p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">หน้าบริการ</span></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* statement */}
      <section className="statement">
        <div className="narrow reveal">
          <span className="eyebrow center">คุณค่าของเรา · Our Promise</span>
          <h3>“มากกว่าผู้นำเข้า... คือเราพร้อมเคียงข้างทุกชีวิต”</h3>
          <p>เราไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์แพทย์ แต่เราขับเคลื่อนความปลอดภัยผ่านผู้เชี่ยวชาญในทุกมิติ เพื่อส่งต่อ <span className="em">‘คุณค่าแห่งการรอดชีวิต’</span> สู่การสร้าง <span className="em">‘พื้นที่ปลอดภัย’</span> ที่สมบูรณ์และยั่งยืน ให้กับเทศบาล บริษัท และโรงงาน</p>
        </div>
      </section>

      {/* courses */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">หลักสูตรฝึกอบรม · Training</span>
            <h2 className="sec">หลักสูตรของเรา</h2>
            <p className="sub">หลักสูตรมาตรฐานสากล AHA และการกู้ภัยทางน้ำ สอนทักษะที่ใช้ได้จริงในวิกฤต</p>
          </div>
          <div className="cgrid">
            <a href="#" className="ccard reveal"><div className="c-num">1</div><div><h4>หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง AED</h4><div className="en">CPR &amp; AED Training</div><div className="foot"><span className="link-more">รายละเอียด →</span></div></div></a>
            <a href="#" className="ccard reveal"><div className="c-num">2</div><div><h4>หลักสูตรนักกู้ภัยทางน้ำทางทะเล</h4><div className="foot"><span className="link-more">รายละเอียด →</span></div></div></a>
            <a href="#" className="ccard reveal"><div className="c-num">3</div><div><h4>หลักสูตรนักดำน้ำเพื่อการกู้ภัย</h4><div className="foot"><span className="link-more">รายละเอียด →</span></div></div></a>
            <a href="#" className="ccard reveal"><div className="c-num">4</div><div><h4>หลักสูตรการช่วยชีวิตผู้ประสบภัยทางน้ำ</h4><div className="en">Lifeguard Training</div><div className="foot"><span className="link-more">รายละเอียด →</span></div></div></a>
          </div>
          <div style={{ marginTop: 28 }}><a href="#" className="link-more">ดูหลักสูตรทั้งหมด →</a><span className="linknote">→ /courses</span></div>
        </div>
      </section>

      {/* latest news */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">ข่าวสาร &amp; ความรู้ · Latest</span>
            <h2 className="sec">บทความล่าสุด</h2>
            <p className="sub">ดึงจากระบบบทความในแอดมินอัตโนมัติ</p>
          </div>
          <div className="ngrid">
            <a href="#" className="ncard reveal"><div className="pic img-ph">[ ปกบทความ 1 ]</div><div className="nbody"><h4 className="ph" style={{ border: 'none', padding: 0, color: 'var(--red)' }}>รอข้อมูลจริง — หัวข้อบทความ</h4><div className="foot"><span className="link-more">อ่านเพิ่มเติม →</span></div></div></a>
            <a href="#" className="ncard reveal"><div className="pic img-ph">[ ปกบทความ 2 ]</div><div className="nbody"><h4 className="ph" style={{ border: 'none', padding: 0, color: 'var(--red)' }}>รอข้อมูลจริง — หัวข้อบทความ</h4><div className="foot"><span className="link-more">อ่านเพิ่มเติม →</span></div></div></a>
            <a href="#" className="ncard reveal"><div className="pic img-ph">[ ปกบทความ 3 ]</div><div className="nbody"><h4 className="ph" style={{ border: 'none', padding: 0, color: 'var(--red)' }}>รอข้อมูลจริง — หัวข้อบทความ</h4><div className="foot"><span className="link-more">อ่านเพิ่มเติม →</span></div></div></a>
          </div>
          <div style={{ marginTop: 28 }}><a href="#" className="link-more">ดูบทความทั้งหมด →</a><span className="linknote">→ /articles</span></div>
        </div>
      </section>

      {/* finale CTA */}
      <section className="finale">
        <div className="narrow reveal">
          <h2>พร้อมสร้าง “พื้นที่ปลอดภัย” ให้องค์กรของคุณแล้วหรือยัง?</h2>
          <p>ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโซลูชันความปลอดภัยที่เหมาะกับองค์กร โรงงาน หรือหน่วยงานของคุณ</p>
          <div className="ctas"><a href="#" className="btn btn-primary">ติดต่อเรา</a></div>
        </div>
      </section>
    </div>
  );
}