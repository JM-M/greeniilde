"use client";

import { useSuspenseCaseStudies } from "@/app/lib/hooks/use-case-study-queries";
import { CaseStudiesCarousel } from "@/app/modules/case-studies/ui/components/case-studies-carousel";

export const CaseStudies = () => {
  const { data: caseStudies } = useSuspenseCaseStudies();

  return (
    <section
      id="case-studies"
      className="container mx-auto space-y-6 px-4 py-16"
    >
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Proof in the field
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Case Studies</h2>
      </div>

      <CaseStudiesCarousel caseStudies={caseStudies} />
    </section>
  );
};
