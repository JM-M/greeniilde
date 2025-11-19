"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { ProductCard } from "@/app/modules/products/ui/components/product-card";
import { Product } from "../../types";

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <div className="space-y-4">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.name}
              className="py-2 pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard {...product} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Previous products</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next products</span>
        </Button>
      </div>
    </div>
  );
};
