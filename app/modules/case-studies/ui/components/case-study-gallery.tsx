"use client";

import Image from "next/image";

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

const placeholderImages: (string | undefined)[] = Array.from({ length: 6 });

export const CaseStudyGallery = ({ images }: CaseStudyGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
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

  const displayImages = images || placeholderImages;

  return (
    <div className="w-full space-y-4">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-3 md:-ml-4">
          {displayImages.map((image, index) => (
            <CarouselItem key={index} className="basis-full pl-3 md:pl-4">
              <div className="bg-secondary relative aspect-square w-full overflow-hidden rounded-xl">
                {image && (
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
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
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
    </div>
  );
};
