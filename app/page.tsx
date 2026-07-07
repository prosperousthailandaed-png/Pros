import Link from 'next/link';
import HeroSlider from '@/components/Heroslider';
import { courses } from '@/lib/data/courses';
import { articles } from '@/lib/data/articles';

export const metadata = {
  title: 'หน้าหลัก | Prosperous',
};

export default function HomePage() {
  return (
    <div className="home">
      {/* hero */}
      <HeroSlider />

      {/* who we are */}
      <section className="who">
        <div className="narrow reveal">
          <h2 className="sec">"ตัวแทน... นวัตกรรมช่วยชีวิต..."</h2>
          <p>
            โพรสเพอรัส เป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล
            พร้อมส่งต่อองค์ความรู้ผ่านหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED)
            ตามมาตรฐาน AHA เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม
          </p>
          <div className="more">
            <Link href="/about" className="link-more">
              รู้จักเราเพิ่มเติม →
            </Link>
          </div>
        </div>
      </section>

      {/* focus / products */}
      <section className="mist" id="focus">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">สินค้าและบริการของเรา</h2>
            <p className="sub">
              นวัตกรรมช่วยชีวิตมาตรฐานสากล ครบทั้งอุปกรณ์ การฝึกอบรม และบริการกู้ภัย
            </p>
          </div>
          <div className="pgrid">
            <Link href="/products/aed" className="pcard reveal">
              <img src="/image/aed/A112.avif" className="contain tall" alt="AED" />
              <div className="pbody">
                <h4>เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ</h4>
                <div className="en">AED</div>
                <p>
                  เครื่อง AED แบรนด์ Acoresmed มาตรฐานสากล ใช้งานง่าย
                  พร้อมในทุกวินาทีวิกฤต
                </p>
                <div className="foot">
                  <span className="link-more">รายละเอียดสินค้า →</span>
                  <span className="linknote">AED 2 รุ่น</span>
                </div>
              </div>
            </Link>

            <Link href="/products/auto-cpr" className="pcard reveal">
              <img src="/image/aed/autocpr.avif" alt="Auto CPR" />
              <div className="pbody">
                <h4>เครื่องนวดหัวใจอัตโนมัติ</h4>
                <div className="en">AUTO CPR</div>
                <p>
                  Auto CPR จาก Michigan Instrument
                  ช่วยปั๊มหัวใจต่อเนื่องอย่างมีประสิทธิภาพในภาวะฉุกเฉิน
                </p>
                <div className="foot">
                  <span className="link-more">รายละเอียดสินค้า →</span>
                  <span className="linknote">รูปใหญ่ + วิดีโอ</span>
                </div>
              </div>
            </Link>

            <Link href="/products/physio" className="pcard reveal">
              <img src="/image/physio/physio.avif" alt="Physical Therapy" />
              <div className="pbody">
                <h4>อุปกรณ์กายภาพบำบัด</h4>
                <div className="en">Physical Therapy</div>
                <p>อุปกรณ์ฟื้นฟูและกายภาพบำบัดสำหรับสถานพยาบาลและองค์กร</p>
                <div className="foot">
                  <span className="link-more">รายละเอียดสินค้า →</span>
                  <span className="linknote">อุปกรณ์ทั้งหมด</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* statement */}
      <section className="statement">
        <div className="narrow reveal">
          <h3 className="text-balance statement__title">“มากกว่าผู้นำเข้า...<br /> คือเราพร้อมเคียงข้างทุกชีวิต”</h3>
          <p>
            เราไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์ทีมการแพทย์ แต่เราขับเคลื่อนความปลอดภัย ผ่านผู้เชี่ยวชาญในทุกมิติ
            เพื่อส่งต่อ <span className="em">‘คุณค่าแห่งการรอดชีวิต’</span> สู่การสร้าง{' '}
            <span className="em">‘พื้นที่ปลอดภัย’</span> ที่สมบูรณ์และยั่งยืน
            ให้กับทุกบริษัท และโรงงาน
          </p>
        </div>
      </section>

      {/* courses */}
      <section className="mist" id="courses">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">หลักสูตรฝึกอบรมของเรา</h2>
            <p className="sub">
              หลักสูตรการช่วยชีวิตขั้นพื้นฐาน American Heart Association (AHA) และการกู้ภัยทางน้ำ
              <br />
              ทักษะที่ใช้ได้จริงในสภาวะวิกฤติ แม้คุณจะไม่ใช่นักกู้ภัย
            </p>
          </div>

          <div className="cgrid">
            {courses.map((course, i) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="ccard reveal"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="cbody">
                  <h4>{course.title}</h4>
                  <div className="en">{course.category}</div>
                  <p>{course.description}</p>
                  <div className="foot">
                    <span className="link-more">ดูเพิ่มเติม →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Link href="/courses" className="link-more">
              ดูหลักสูตรทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* latest news */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="sec">ข่าวสาร &amp; ความรู้</h2>
            <p className="sub">ดึงจากระบบบทความในแอดมินอัตโนมัติ</p>
          </div>
          <div className="ngrid">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="ncard reveal"
              >
                {article.cover ? (
                  <img src={article.cover} alt={article.title} className="pic" />
                ) : (
                  <div className="pic img-ph">[ ปกบทความ ]</div>
                )}
                <div className="nbody">
                  <h4 className="ph" style={{ border: 'none', padding: 0, color: 'var(--red)' }}>
                    {article.title}
                  </h4>
                  <div className="foot">
                    <span className="link-more">อ่านเพิ่มเติม →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href="/articles" className="link-more">
              ดูบทความทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* finale CTA */}
      <section className="finale">
        <div className="narrow reveal">
          <h2>พร้อมสร้าง “พื้นที่ปลอดภัย” ให้องค์กรของคุณแล้วหรือยัง?</h2>
          <p>
            ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโซลูชันความปลอดภัยที่เหมาะกับองค์กร
            ของคุณ
          </p>
          <div className="ctas">
            <Link href="/contact" className="btn btn-primary">
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}