// app/products/aed/a112/page.tsx
import AedProductDetail from "@/components/AedProductDetail";
import { aedProducts } from "@/lib/data/aed-products";

export default function AedA112Page() {
  return <AedProductDetail product={aedProducts.a112} />;
}