"use client";

import { PageTitle } from "@/app/components/shared/page-title";
import { useSuspenseCaseStudies } from "@/app/lib/hooks/use-case-study-queries";
import { CaseStudiesGrid } from "@/app/modules/case-studies/ui/components/case-studies-grid";

export const CaseStudiesViewClient = () => {
  const { data: caseStudies } = useSuspenseCaseStudies();

  return (
    <div className="view-container">
      <PageTitle title="Case Studies" />
      <div className="mt-4">
        <CaseStudiesGrid caseStudies={caseStudies} />
      </div>
    </div>
  );
};
