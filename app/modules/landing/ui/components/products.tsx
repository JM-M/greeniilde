"use client";

import { SectionHeader } from "@/app/components/shared/section-header";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useSuspenseListCategories } from "@/app/modules/categories/hooks/use-category-queries";
import { useSuspenseGetProductsFromMeilisearch } from "@/app/modules/products/hooks/use-product-queries";
import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";
import {
  formatPriceRange,
  getProductPriceRange,
} from "@/app/modules/products/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const productTabs = [
  {
    value: "panels",
    label: "Panels",
    title: "High-efficiency solar panels",
    description:
      "Capture more sunlight with monocrystalline modules engineered for modern rooftops.",
  },
  {
    value: "inverters",
    label: "Inverters",
    title: "Reliable inverters",
    description:
      "Streamline energy conversion with smart monitoring for every installation.",
  },
  {
    value: "batteries",
    label: "Batteries",
    title: "Energy storage",
    description:
      "Store surplus power safely for overnight usage and cloudy days.",
  },
  {
    value: "solar-pumps",
    label: "Solar Pumps",
    title: "Agricultural pumps",
    description:
      "Deliver consistent irrigation with minimal maintenance and zero fuel costs.",
  },
];

export const Products = () => {
  const { data: categoriesData } = useSuspenseListCategories({});
  const categories = categoriesData.product_categories;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // TODO: Move to query params with nuqs

  // Set initial selected category to first category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const { data: productsData } = useSuspenseGetProductsFromMeilisearch({
    filter: selectedCategory
      ? `categories.id = "${selectedCategory}"`
      : undefined,
  });
  console.log("productsData: ", productsData);

  const products =
    productsData?.hits.map((hit) => {
      const priceRange = getProductPriceRange(hit);
      return {
        id: hit.id,
        name: hit.title || "",
        price: formatPriceRange(priceRange),
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
        onValueChange={setSelectedCategory}
      >
        <TabsList className="mx-auto flex h-fit flex-wrap justify-center gap-2 bg-transparent">
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
