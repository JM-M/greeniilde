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

const caseStudies = [
  {
    name: "Desert Ridge Agrisolar",
  },
  {
    name: "Harborview Microgrid",
  },
  {
    name: "Mountain Crest Resort",
  },
  {
    name: "Riverside Packaging Plant",
  },
  {
    name: "Northwind Data Center",
  },
];

export const CaseStudies = () => {
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
    <section id="case-studies" className="container px-4 py-16 mx-auto space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Proof in the field
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Case Studies</h2>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {caseStudies.map((study) => (
            <CarouselItem
              key={study.name}
              className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="border rounded-xl p-4 space-y-2 bg-card">
                <div className="w-full aspect-4/3 rounded-lg bg-secondary" />
                <div>
                  <p className="text-lg font-semibold">{study.name}</p>
                  {/* <p className="text-sm text-muted-foreground">
                    Coming soon: metrics & outcomes
                  </p> */}
                </div>
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
    </section>
  );
};
