"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { Button } from "@/app/components/ui/button";
import { ProductCard } from "@/app/modules/products/ui/components/product-card";

const featuredProducts = [
  {
    name: "Helios Max Panel Kit",
    price: "$6,499",
    specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
  },
  {
    name: "Aurora Smart Inverter",
    price: "$2,199",
    specs: ["Hybrid ready", "98% efficiency", "Mobile app"],
  },
  {
    name: "Lumen Battery Stack",
    price: "$7,899",
    specs: ["18 kWh storage", "Stackable modules", "Indoor/outdoor"],
  },
  {
    name: "Irriga Solar Pump",
    price: "$3,250",
    specs: ["45m head", "Brushless motor", "Remote monitoring"],
  },
  {
    name: "SolGuard Maintenance Plan",
    price: "$99/mo",
    specs: ["Quarterly checks", "Priority support", "Performance reports"],
  },
];

export const ProductCarousel = () => {
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
          {featuredProducts.map((product) => (
            <CarouselItem
              key={product.name}
              className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3"
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
