"use client";

import { PageTitle } from "@/app/components/shared/page-title";
import { useSuspenseCaseStudy } from "@/app/lib/hooks/use-case-study-queries";
import { CaseStudyOverview } from "@/app/modules/case-studies/ui/components/case-study-overview";
import { CaseStudyProjectDetailsCard } from "@/app/modules/case-studies/ui/components/case-study-project-details-card";
import { RelatedCaseStudies } from "@/app/modules/case-studies/ui/components/related-case-studies";
import { notFound } from "next/navigation";
import { CaseStudyGallery } from "./case-study-gallery";

type CaseStudyDetailsViewClientProps = {
  id: string;
};

export const CaseStudyDetailsViewClient = ({
  id,
}: CaseStudyDetailsViewClientProps) => {
  const { data: caseStudy } = useSuspenseCaseStudy(id);

  if (!caseStudy) {
    return notFound();
  }

  const subtitle = `${caseStudy.type} • ${caseStudy.date} • ${caseStudy.location}`;

  return (
    <div className="view-container">
      <PageTitle title={caseStudy.name} subtitle={subtitle} />

      {/* TODO: Consider adding breadcrumbs here. */}

      {/* Hero Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <CaseStudyGallery images={caseStudy.imageUrls} />
        </div>
        <div>
          {/* Metrics data not available in source document */}
          {/* <CaseStudyKeyMetrics /> */}
          <CaseStudyProjectDetailsCard
            location={caseStudy.location}
            projectType={caseStudy.type}
            dateCompleted={caseStudy.date}
            technologies={caseStudy.technologies}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-8">
          <CaseStudyOverview overview={caseStudy.overview} />
          {/* <CaseStudyChallenge /> */}
          {/* <CaseStudySolution /> */}
          {/* <CaseStudyResults /> */}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          {/* <CaseStudyProjectDetailsCard /> */}
          {/* <CaseStudyMetricsSummaryCard /> */}
          {/* <CaseStudyTestimonialCard /> */}
        </div>
      </div>

      {/* Technical Details Tabs */}
      {/* <div className="mt-10">
        <CaseStudyDetailsTabs />
      </div> */}

      {/* Related Case Studies */}
      <div className="mt-10">
        <RelatedCaseStudies currentId={id} />
      </div>
    </div>
  );
};
