import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    // กำหนดให้หน้าจอยืดเต็มความสูง (อย่างน้อย 100vh) เพื่อดัน Footer ไปไว้ล่างสุด
    <div className="flex flex-col min-height-screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* 2. ส่วนเนื้อหาตรงกลาง (ขยายพื้นที่เต็มที่เหลือ และจัดกึ่งกลางให้สวยงาม) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
          Products
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>
          Coming soon...
        </p>
      </main>

    </div>
  )
}