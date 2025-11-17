"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { cn } from "@/app/lib/utils";

const placeholderSlides = Array.from({ length: 8 });

export const ProductImagesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-full space-y-4">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {placeholderSlides.map((_, index) => (
            <CarouselItem key={index}>
              <div className="bg-secondary aspect-square w-full rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ScrollArea className="w-full" type="scroll">
        <div className="flex items-center gap-2 pb-2">
          {placeholderSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "focus-visible:ring-ring relative h-16 w-16 rounded-lg border transition focus-visible:ring-2 focus-visible:outline-none",
                selectedIndex === index
                  ? "border-primary"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="bg-secondary absolute inset-1 rounded-md" />
              <span className="sr-only">{`Go to slide ${index + 1}`}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
