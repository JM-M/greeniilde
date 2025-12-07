"use client";

import { useCaseStudies } from "@/app/lib/hooks/use-case-study-queries";
import { CaseStudiesCarousel } from "@/app/modules/case-studies/ui/components/case-studies-carousel";

type RelatedCaseStudiesProps = {
  currentId: string;
};

export const RelatedCaseStudies = ({ currentId }: RelatedCaseStudiesProps) => {
  const { data: allCaseStudies, isLoading } = useCaseStudies();

  if (isLoading || !allCaseStudies) {
    return (
      <div className="text-muted-foreground py-4">
        Loading related case studies...
      </div>
    );
  }

  const relatedCaseStudies = allCaseStudies.filter(
    (study) => study.id !== currentId,
  );

  if (relatedCaseStudies.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-case-studies-heading"
      className="space-y-4"
    >
      <h3 id="related-case-studies-heading" className="text-xl font-semibold">
        Related Case Studies
      </h3>
      <CaseStudiesCarousel caseStudies={relatedCaseStudies} />
    </section>
  );
};
