import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/img/First.mp4" type="video/webm" />
            <source src="/img/seconds.mp4" type="video/mp4" />
          </video>
          <div className="wrap">
            <h1>มากกว่าผู้นำเข้า คือเรา<span className="hl">พร้อมเคียงข้างทุกชีวิต</span></h1>
          </div>
        </section>

        <section className="mist" id="focus">
          <div className="wrap">
            <h2 className="sec">สินค้าและบริการของเรา</h2>
            <div className="pgrid">
              <div className="pcard">
                {/* แก้ไขให้เรียกใช้รูปภาพจาก public/img/ */}
                <Image 
                  src="/img/a102_1.avif" 
                  alt="AED" 
                  width={300} 
                  height={170} 
                />
                <div className="pbody">
                  <h4>เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}