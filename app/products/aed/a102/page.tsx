// app/products/aed/a102/page.tsx
import AedProductDetail from "@/components/AedProductDetail";
import { aedProducts } from "@/lib/data/aed-products";

export default function AedA102Page() {
  return <AedProductDetail product={aedProducts.a102} />;
}