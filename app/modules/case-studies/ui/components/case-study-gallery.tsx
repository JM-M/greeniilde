"use client";

import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CaseStudyGalleryProps = {
  images?: string[];
};

const placeholderImages = Array.from({ length: 6 });

export const CaseStudyGallery = ({ images }: CaseStudyGalleryProps) => {
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

  const displayImages = images || placeholderImages;

  return (
    <div className="w-full space-y-4">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-3 md:-ml-4">
          {displayImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="bg-secondary aspect-square w-full overflow-hidden rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          // onClick={() => api?.scrollPrev()}
          // disabled={!canScrollPrev}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          // onClick={() => api?.scrollNext()}
          // disabled={!canScrollNext}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
    </div>
  );
};
