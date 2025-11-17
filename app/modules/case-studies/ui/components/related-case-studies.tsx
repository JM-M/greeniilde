"use client";

import { CaseStudiesCarousel } from "@/app/modules/case-studies/ui/components/case-studies-carousel";

export const RelatedCaseStudies = () => {
  return (
    <section aria-labelledby="related-case-studies-heading" className="space-y-4">
      <h3 id="related-case-studies-heading" className="text-xl font-semibold">
        Related Case Studies
      </h3>
      <CaseStudiesCarousel />
    </section>
  );
};

