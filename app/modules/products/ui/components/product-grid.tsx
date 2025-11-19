import Link from "next/link";
import { Product } from "../../types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.id}`}>
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            specs={product.specs}
            image={product.image}
            className="h-full"
          />
        </Link>
      ))}
    </div>
  );
};
