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
          <h1>มากกว่าผู้นำเข้า คือเรา<span className="hl">พร้อมเคียงข้างทุกชีวิต</span></h1>
          <p className="lead">โพรสเพอรัส — ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร พร้อมส่งต่อองค์ความรู้การกู้ชีพสู่ทุกคนในสังคม</p>
          <svg className="ecg" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 30 H420 l18 -22 l20 44 l16 -52 l22 60 l18 -30 H720 l16 -16 l14 30 l12 -14 H1200" />
          </svg>
        </div>
      </section>

      {/* who we are */}
      <section className="who">
        <div className="narrow reveal">
          <h2 className="sec">ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิต</h2>
          <p>โพรสเพอรัส เป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล พร้อมส่งต่อองค์ความรู้ผ่านหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ตามมาตรฐาน AHA เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม</p>
          <div className="more"><Link href="/about" className="link-more">รู้จักเราเพิ่มเติม →</Link></div>
        </div>
      </section>

      {/* focus / products */}
      <section className="mist" id="focus">
        <div className="wrap">
          <div className="sec-head reveal">
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
          </div>
        </div>
      </section>

      {/* statement */}
      <section className="statement">
        <div className="narrow reveal">
          <h3>“มากกว่าผู้นำเข้า... คือเราพร้อมเคียงข้างทุกชีวิต”</h3>
          <p>เราไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์แพทย์ แต่เราขับเคลื่อนความ<br className="hidden md:inline" />ปลอดภัยผ่านผู้เชี่ยวชาญในทุกมิติ เพื่อส่งต่อ <span className="em">‘คุณค่าแห่งการรอดชีวิต’<br className="hidden md:inline" /></span> สู่การสร้าง <span className="em">‘พื้นที่ปลอดภัย’</span> ที่สมบูรณ์และยั่งยืน ให้กับเทศบาล บริษัท และโรงงาน</p>
        </div>
      </section>

      {/* courses */}
        <section className="mist" id="focus">
         <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">หลักสูตรฝึกอบรมของเรา</h2>
            <p className="sub">หลักสูตรมาตรฐานสากล AHA และการกู้ภัยทางน้ำ สอนทักษะที่ใช้ได้จริงในวิกฤต</p>
          </div> 
          <div className="cgrid">
            <a href="#" className="ccard reveal">
              <img src="/image/swimmer.avif" alt="a102_1" />
              <div className="cbody">
                <div className="en">AED (CPR & AED Training)</div>
                <h4>หลักสูตรการช่วยชีวิตขั้นพื้นฐาน</h4>
                <p>หลักสูตรการช่วยชีวิตขั้นพื้นฐานและการใช้เครื่อง <br className="hidden md:inline" /></p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">AED (CPR & AED Training)</span></div>
              </div>
            </a>

            <a href="#" className="ccard reveal">
              <img src="/image/rescue_swimmer.avif" alt="autocpr" />
              <div className="cbody">
                <div className="en">RESCUE SWIMMER</div>
                <h4>หลักสูตรกู้ภัยทางน้ำทางทะเล</h4>
                <p>ฝึกการว่ายน้ำตัวเปล่า และการช่วยเหลือผู้ประสบภัยในกรณีที่ไม่มี อุปกรณ์ช่วยเหลืออยู่ </p>
                <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">RESCUE SWIMMER</span></div>
              </div>
            </a>

            <a href="#" className="ccard reveal">
              <img src="/image/driving.avif" alt="physio" />
              <div className="cbody">
                <div className="en">DRIVER</div>
                <h4>หลักสูตรการดำน้ำเพื่อการกู้ภัย</h4>
                <p><span className="ph">รอข้อความจริง</span></p>
              <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">DRIVER</span></div>
              </div>
            </a>

            <a href="#" className="ccard reveal">
              <img src="/image/lifeguard.avif" alt="physio" />
              <div className="cbody">
                <div className="en">LIFEGUARD TRAINING</div>
                <h4>หลักสูตรการช่วยชีวิต ผู้ประสบภัยทางน้ำ</h4>
                <p><span className="ph">รอข้อความจริง</span></p>
              <div className="foot"><span className="link-more">ดูเพิ่มเติม →</span><span className="linknote">LIFEGUARD TRAINING</span></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* latest news */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">ข่าวสาร &amp; ความรู้ </h2>
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