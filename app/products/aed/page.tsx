// app/products/aed/page.tsx
import Image from "next/image";
import Link from "next/link";

const aedProducts = [
  {
    id: "a112",
    name: "AED รุ่น A112",
    image: "/image/A112.avif",
    href: "/products/aed/a112",
  },
  {
    id: "a102",
    name: "AED รุ่น A102",
    image: "/image/A102.avif",
    href: "/products/aed/a102",
  },
];

export default function AedProductsPage() {
  return (
    <div className="relative min-h-screen">
      {/* ทางกลับ */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white font-medium text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
      >
        ← กลับหน้าหลัก
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen relative">
        {/* เส้นแบ่งกลาง (แสดงเฉพาะจอใหญ่) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/20 z-10" />

        {aedProducts.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            className="relative group overflow-hidden flex items-center justify-center bg-gray-50"
          >
            <div className="relative w-full h-[50vh] md:h-[100vh]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              {/* overlay ตอน hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none">
                <span className="text-white text-2xl md:text-3xl font-bold tracking-normal drop-shadow-md">
                  {product.name}
                </span>
                <span className="mt-2 text-white/80 text-sm tracking-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ดูรายละเอียด →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}