"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { CaseStudy } from "@/app/modules/case-studies/transforms";
import { CaseStudyCard } from "@/app/modules/case-studies/ui/components/case-study-card";

type CaseStudiesCarouselProps = {
  caseStudies: CaseStudy[];
};

export const CaseStudiesCarousel = ({
  caseStudies,
}: CaseStudiesCarouselProps) => {
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
    <>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {caseStudies?.map((study) => (
            <CarouselItem
              key={study.id}
              className="pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <Link href={`/case-studies/${study.id}`} className="block h-full">
                <CaseStudyCard
                  name={study.name}
                  location={study.location}
                  imageUrl={study.imageUrls?.[0]}
                  className="h-full"
                />
              </Link>
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
          <span className="sr-only">Previous study</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next study</span>
        </Button>
      </div>
    </>
  );
};
