export const metadata = {
  title: 'เกี่ยวกับเรา | Prosperous Rescue Swimming',
};

/**
 * หน้า "เกี่ยวกับเรา"
 * -------------------------------------------------------------
 * ตั้งใจออกแบบให้ "ต่างจากหน้าแรก" ตามที่ขอ โดยหน้าแรกเน้นโครงแบบ
 * การ์ด/กริด (สินค้า, หลักสูตร) ส่วนหน้านี้เล่าเรื่องแบบ "ไทม์ไลน์"
 * ต่อเนื่องตั้งแต่จุดเริ่มต้นบริษัท → ทิศทางอนาคต → คุณค่าองค์กร
 * แต่ยังคงธีมสี/ฟอนต์/ระยะห่างชุดเดียวกับหน้าแรกทุกประการ
 * (ดูรายละเอียดการปรับใน CLAUDE.md)
 * -------------------------------------------------------------
 */
export default function AboutPage() {
  return (
    <div className="about">
      {/* hero: ต่างจากหน้าแรกตรงที่ไม่ใช้วิดีโอ ใช้พื้นเข้มไล่เฉดแทน
          เพื่อ "เกริ่น" เส้นไทม์ไลน์ที่จะพาดยาวตลอดหน้า */}
      <section className="about-hero">
        <div className="wrap">
          <h1>
            เปลี่ยนทุกวินาทีวิกฤต
            <br />
            ให้เป็น<span className="hl">โอกาสรอดชีวิต</span>
          </h1>
          <p className="lead">
            โพรสเพอรัส — ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร
            พร้อมส่งต่อองค์ความรู้การกู้ชีพสู่ทุกคนในสังคม
          </p>
        </div>
      </section>

      {/* who */}
      <section className="who">
        <div className="narrow reveal">
          <span className="eyebrow">เราเป็นใคร · Who We Are</span>
          <h2 className="sec">ผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิต</h2>
          <p>
            โพรสเพอรัส คือผู้เชี่ยวชาญด้านนวัตกรรมช่วยชีวิตและอุปกรณ์กายภาพบำบัดครบวงจร
            เราเป็นตัวแทนจำหน่ายเครื่อง AED และ Auto CPR มาตรฐานสากล พร้อมมุ่งมั่นส่งต่อองค์ความรู้ผ่าน
            หลักสูตรฝึกอบรม การปฐมพยาบาล และการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ตามมาตรฐาน AHA
            (American Heart Association) เพื่อสร้างความพร้อมในการปกป้องทุกชีวิตในสังคม
          </p>
        </div>
      </section>

      {/* story: เนื้อหาเดิมทั้งหมด (ไม่มีการเพิ่ม/ตัดข้อความ) จัดใหม่เป็น
          4 จุดบนไทม์ไลน์ตามลำดับที่เล่าอยู่แล้วในต้นฉบับ */}
      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow center">เรื่องราวของเรา · Our Story</span>
            <h2 className="sec">“เริ่มต้นจากความสูญเสีย... สู่ภารกิจปกป้องทุกหัวใจ”</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-dot">1</div>
              <div className="timeline-card">
                <h3>ภาพจำที่เปลี่ยนชีวิต</h3>
                <p>
                  จุดเริ่มต้นของ บริษัท โพรสเพอรัส เกิดขึ้นจากภาพจำที่เปลี่ยนชีวิตของ{' '}
                  <span className="em">คุณเพ็ญธรฯ</span> และเพื่อนสนิทสมัยเรียน ศิษย์เก่าด้านกายภาพบำบัด
                  จากมหาวิทยาลัยมหิดล ในฐานะคนที่เรียนมาเพื่อฟื้นฟูชีวิตมนุษย์ ไม่มีอะไรจะเจ็บปวดไปกว่าการได้เห็น
                  คนเสียชีวิตจากอาการหัวใจล้มเหลวเฉียบพลัน ทั้งในออฟฟิศที่ทำงาน และในสนามกีฬาที่ทุกคนควรจะแข็งแรง
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-dot">2</div>
              <div className="timeline-card">
                <h3>ความจริงอันโหดร้ายที่ทุกคนเผชิญ</h3>
                <p>
                  ภาพของความตื่นตระหนก มือที่สั่นเทาของผู้คนรอบข้าง และความจริงอันโหดร้ายที่ว่า
                  <span className="pull">
                    “ในนาทีวิกฤตนั้น ไม่มีใครเข้าถึงเครื่อง AED และไม่มีใครรู้วิธีใช้งานมันเลย”
                  </span>
                  กลายเป็นเรื่องที่ทำให้คุณเพ็ญธรฯ และเพื่อนตระหนักว่า ลำพังเพียงความรู้ในห้องเรียนไม่ใช่อาวุธที่เพียงพอ
                  หากผู้คนในสังคมยังขาดแคลนเครื่องมือช่วยชีวิต
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-dot">3</div>
              <div className="timeline-card">
                <h3>จากอุปกรณ์กายภาพ สู่สะพานเชื่อมความปลอดภัย</h3>
                <p>
                  จากเดิมที่เริ่มต้นธุรกิจด้วยการจำหน่ายอุปกรณ์ทางกายภาพ จึงได้ปลุกอุดมการณ์ของคุณเพ็ญธรฯ และเพื่อนในเรื่องใหม่
                  “โพรสเพอรัส” จึงไม่ได้เป็นเพียงผู้จำหน่ายอุปกรณ์ แต่{' '}
                  <span className="em">“โพรสเพอรัส” คือสะพานเชื่อมต่อความปลอดภัย</span> ที่มุ่งมั่นนำเข้าและส่งมอบเครื่อง
                  AED ที่มีมาตรฐาน พร้อมทั้งส่งต่อความรู้ ความเข้าใจ ในการกู้ชีพขั้นพื้นฐาน
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-dot">4</div>
              <div className="timeline-card">
                <h3>ทุกวินาทีชีวิตมีความหมาย</h3>
                <p>
                  เพราะ “โพรสเพอรัส” เชื่อว่า <span className="em">‘วินาทีชีวิต’ ของทุกคนมีความหมาย</span> และจะไม่ยอมให้
                  ใครต้องสูญเสียคนที่รักไป... เพียงเพราะคำว่า เข้าไม่ถึงอุปกรณ์ และขาดความรู้ ความเข้าใจอีกต่อไป
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* direction: วิสัยทัศน์/พันธกิจ — เดินเรื่องต่อจากไทม์ไลน์อดีต
          มาสู่ "ทิศทางที่กำลังเดินหน้า" ในปัจจุบัน/อนาคต */}
      <section>
        <div className="narrow">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow center">ทิศทางองค์กร · Our Direction</span>
            <h2 className="sec">วิสัยทัศน์และพันธกิจ</h2>
          </div>
          <div className="vision-card reveal" style={{ marginTop: 42 }}>
            <span className="eyebrow">วิสัยทัศน์ · Vision</span>
            <h3>
              “เป็นผู้นำด้านนวัตกรรมช่วยชีวิตและบริการกู้ชีพแบบครบวงจร ที่สังคมไว้วางใจ
              เพื่อเปลี่ยนทุกวินาทีวิกฤตให้เป็นโอกาสรอดชีวิตอย่างยั่งยืน”
            </h3>
          </div>
          <div className="reveal" style={{ marginTop: 54, textAlign: 'center' }}>
            <span className="eyebrow center">พันธกิจ · Mission</span>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 12, color: 'var(--ink)' }}>
              ภารกิจหลักที่ขับเคลื่อนเพื่อบรรลุวิสัยทัศน์
            </h3>
          </div>
        </div>

        <div className="wrap">
          <div className="mission">
            <div className="m-item reveal">
              <div className="m-num">1</div>
              <h4>สรรหานวัตกรรมทางการแพทย์ระดับโลก</h4>
              <div className="en">World-Class Innovation</div>
              <p>
                มุ่งมั่นเป็นตัวแทนจำหน่ายอุปกรณ์กายภาพและอุปกรณ์กู้ชีพมาตรฐานสากล อาทิ
                เครื่องกระตุกหัวใจไฟฟ้าอัตโนมัติ (AED) แบรนด์ Acoresmed และเครื่องนวดหัวใจอัตโนมัติ (Auto CPR)
                จาก Michigan Instrument เพื่อให้คนไทยเข้าถึงเทคโนโลยีช่วยชีวิตที่ดีที่สุด
              </p>
            </div>
            <div className="m-item reveal">
              <div className="m-num">2</div>
              <h4>ยกระดับความรู้สู่มาตรฐานสากล</h4>
              <div className="en">Standardized Training</div>
              <p>
                ส่งเสริมและเปิดหลักสูตรฝึกอบรมการช่วยชีวิตขั้นพื้นฐาน (CPR &amp; AED) ที่ได้มาตรฐานสากลของ
                สมาคมแพทย์โรคหัวใจแห่งอเมริกา (AHA) เพื่อสร้างผู้ปฏิบัติการที่เชี่ยวชาญและมั่นใจในสถานการณ์จริง
              </p>
            </div>
            <div className="m-item reveal">
              <div className="m-num">3</div>
              <h4>พิทักษ์ความปลอดภัยทางน้ำ</h4>
              <div className="en">Maritime Rescue Excellence</div>
              <p>
                สนับสนุนและขับเคลื่อน ชมรมกู้ภัยทางน้ำทางทะเล ภายใต้การบริหารงานโดย นาวาตรี ดร.ฐาพล สมสกุล
                ในการส่งต่อองค์ความรู้และทักษะการช่วยชีวิตทางน้ำชั้นสูงในภาวะฉุกเฉิน
              </p>
            </div>
            <div className="m-item reveal">
              <div className="m-num">4</div>
              <h4>ขับเคลื่อนสังคมและลดความสูญเสีย</h4>
              <div className="en">Social Responsibility &amp; CSR</div>
              <p>
                มุ่งมั่นดำเนินกิจกรรมเพื่อสังคม (CSR) เป็นแกนกลางระดมงบประมาณและทรัพยากรจากภายนอก
                เพื่อจัดฝึกอบรมการกู้ชีพและการป้องกันอุบัติภัยทางน้ำให้แก่หน่วยงานทหาร ทหารเรือ และหน่วยงานภาครัฐ
                ลดอัตราการสูญเสียจากการจมน้ำอย่างเป็นรูปธรรม
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="mist">
        <div className="wrap">
          <div className="values-head reveal">
            <span className="eyebrow center">คุณค่าหลักขององค์กร · Core Values</span>
            <h2 className="sec">คุณค่าที่สะกดจากชื่อของเรา</h2>
            <p className="sub">
              ตัวอักษร 7 ตัวแรกของชื่อบริษัท “PROSPEROUS” คือคุณค่าหลัก 7 ประการ
              ที่เรายึดถือในการทำงานทุกวัน
            </p>
            {/* wordmark สะกดชื่อบริษัทเต็ม ๆ เรียงเป็นแถวแนวนอน P R O S P E R O U S
                — ตัวที่มีสีแดง (is-value) คือ 7 ตัวแรกที่มีคุณค่ากำกับไว้ในการ์ดด้านล่าง */}
            <div className="prosper-mark" aria-hidden="true">
              <span className="is-value">P</span>
              <span className="is-value">R</span>
              <span className="is-value">O</span>
              <span className="is-value">S</span>
              <span className="is-value">P</span>
              <span className="is-value">E</span>
              <span className="is-value">R</span>
              <span className="is-value">O</span>
              <span className="is-value">U</span>
              <span className="is-value">S</span>
            </div>
          </div>
          {/* การ์ดคุณค่า 7 ใบ เรียงลงมาเป็นคอลัมน์เดียว (จัดการใน .values ที่ globals.css) */}
          <div className="values">
            <div className="v-card reveal">
              <div className="v-letter">P</div>
              <div>
                <div className="en">Professionalism</div>
                <h4>ความเป็นมืออาชีพ</h4>
                <p>
                  เราส่งมอบเฉพาะอุปกรณ์การแพทย์ระดับโลก เช่น AED แบรนด์ Acoresmed และ Auto CPR จาก Michigan
                  ควบคู่ไปกับการฝึกอบรมตามมาตรฐานสากล AHA
                </p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">R</div>
              <div>
                <div className="en">Rescue Excellence</div>
                <h4>ความเป็นเลิศด้านการกู้ชีพและกู้ภัย</h4>
                <p>เราไม่เพียงแต่สอนทฤษฎี แต่เราสร้าง “ทักษะที่ใช้ได้จริงในวิกฤต” ทั้งบนบกและทางน้ำ</p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">O</div>
              <div>
                <div className="en">Outreach for Society</div>
                <h4>การเข้าถึงและช่วยเหลือสังคม</h4>
                <p>เราขยายโอกาสการเข้าถึงอุปกรณ์และความรู้ไปยังพื้นที่หรือหน่วยงานที่ขาดแคลน ผ่านกิจกรรม CSR</p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">S</div>
              <div>
                <div className="en">Safety First</div>
                <h4>ความปลอดภัยเป็นหัวใจสูงสุด</h4>
                <p>
                  ทุกผลิตภัณฑ์ ทุกหลักสูตร และทุกการปฏิบัติงานของเรา มีเป้าหมายเดียวคือการลดการสูญเสีย
                  และป้องกันการเกิดอุบัติภัยซ้ำซ้อน
                </p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">P</div>
              <div>
                <div className="en">Passion for Life</div>
                <h4>ความมุ่งมั่นเพื่อคุณค่าของทุกชีวิต</h4>
                <p>
                  เราทำงานด้วยใจที่เชื่อว่า “ทุกวินาทีชีวิตมีคำว่าโอกาสซ่อนอยู่” และเราจะไม่ยอมแพ้ต่อข้อจำกัดใด ๆ
                </p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">E</div>
              <div>
                <div className="en">Education &amp; Empowerment</div>
                <h4>การศึกษาและการสร้างพลัง</h4>
                <p>เราเชื่อในการส่งต่อองค์ความรู้ที่ถูกต้องเพื่อขจัดความกลัว และเปลี่ยนคนธรรมดาให้กลายเป็น “ผู้ช่วยชีวิต”</p>
              </div>
            </div>
            <div className="v-card reveal">
              <div className="v-letter">R</div>
              <div>
                <div className="en">Responsibility &amp; Reliability</div>
                <h4>ความรับผิดชอบและความน่าเชื่อถือ</h4>
                <p>เราเป็นองค์กรที่สังคมและหน่วยงานภาครัฐ / ความมั่นคง มอบความไว้วางใจให้ดูแลชีวิตและความปลอดภัย</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* finale */}
      <section className="finale">
        <div className="narrow reveal">
          <div className="big-r">PROSPER</div>
          <h3>นิยามความหมายชื่อของบริษัท</h3>
          <p className="quote">
            “เราไม่ได้มุ่งหวังเพียงแค่ความเจริญรุ่งเรืองในทางธุรกิจเท่านั้น แต่{' '}
            <span className="em">PROSPER</span> ของเรา คือการทำให้{' '}
            <span className="em">‘ชีวิตและความปลอดภัยของคนในสังคม เจริญงอกงามและมั่นคงขึ้น’</span>{' '}
            ด้วยนวัตกรรมการช่วยชีวิตและการส่งต่อความรู้ที่ถูกต้อง เพื่อให้ทุกหัวใจได้มีโอกาสเติบโตและแข็งแรงต่อไป”
          </p>
        </div>
      </section>
    </div>
  );
}