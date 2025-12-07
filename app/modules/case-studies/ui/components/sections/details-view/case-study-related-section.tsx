import { Suspense } from "react";
import { RelatedCaseStudies } from "../../related-case-studies";

type CaseStudyRelatedSectionProps = {
  currentId: string;
};

export const CaseStudyRelatedSection = ({
  currentId,
}: CaseStudyRelatedSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-4">
      <Suspense fallback={<div>Loading related case studies...</div>}>
        <RelatedCaseStudies currentId={currentId} />
      </Suspense>
    </section>
  );
};
