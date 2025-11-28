"use client";

import { SectionHeader } from "@/app/components/shared/section-header";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useSuspenseListCategories } from "@/app/modules/categories/hooks/use-category-queries";
import { useSuspenseGetProductsFromMeilisearch } from "@/app/modules/products/hooks/use-product-queries";
import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";
import { formatPriceRange } from "@/app/modules/products/utils/price";
import Link from "next/link";
import { useLandingProductsParams } from "../../hooks/use-landing-products-params";
import { getMeilisearchFilterFromLandingProductsParams } from "../../utils";

export const Products = () => {
  const { data: categoriesData } = useSuspenseListCategories({});
  const categories = categoriesData.product_categories;

  const [landingProductsParams, setLandingProductsParams] =
    useLandingProductsParams();
  const selectedCategory = landingProductsParams.categoryId;

  const { data: productsData } = useSuspenseGetProductsFromMeilisearch({
    filter: getMeilisearchFilterFromLandingProductsParams(
      landingProductsParams,
    ),
  });

  const products =
    productsData?.hits.map((hit) => {
      return {
        id: hit.id,
        name: hit.title || "",
        price: formatPriceRange({
          min: hit.min_price,
          max: hit.max_price,
        }),
        specs: hit.tags?.map((tag) => tag.value) || [],
        image: hit.thumbnail || "",
      };
    }) || [];

  return (
    <section id="products" className="container mx-auto space-y-6 px-4 py-16">
      <SectionHeader
        title="Products"
        description="We offer a wide range of products to suit your needs."
      />
      <Tabs
        value={selectedCategory || undefined}
        onValueChange={(value) =>
          setLandingProductsParams({ categoryId: value })
        }
      >
        <TabsList className="mx-auto flex h-fit flex-wrap justify-center gap-2 bg-transparent">
          <TabsTrigger
            value="all"
            className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-[unset] cursor-pointer"
          >
            All
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-[unset] cursor-pointer"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-2 space-y-4">
        <ProductCarousel products={products} />
      </div>
      <div>
        <Button
          variant="link"
          className="text-primary mx-auto flex w-fit"
          asChild
        >
          <Link href="/products" prefetch>
            View All Products
          </Link>
        </Button>
      </div>
    </section>
  );
};
