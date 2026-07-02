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
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
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
            <div className="absolute inset-0 transition-colors flex items-end justify-center pb-12">
              <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">
                {product.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}