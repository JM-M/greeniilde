import { PageTitle } from "@/app/components/shared/page-title";
import { CaseStudyChallenge } from "@/app/modules/case-studies/ui/components/case-study-challenge";
import { CaseStudyDetailsTabs } from "@/app/modules/case-studies/ui/components/case-study-details-tabs";
import { CaseStudyHero } from "@/app/modules/case-studies/ui/components/case-study-hero";
import { CaseStudyKeyMetrics } from "@/app/modules/case-studies/ui/components/case-study-key-metrics";
import { CaseStudyMetricsSummaryCard } from "@/app/modules/case-studies/ui/components/case-study-metrics-summary-card";
import { CaseStudyOverview } from "@/app/modules/case-studies/ui/components/case-study-overview";
import { CaseStudyProjectDetailsCard } from "@/app/modules/case-studies/ui/components/case-study-project-details-card";
import { CaseStudyResults } from "@/app/modules/case-studies/ui/components/case-study-results";
import { CaseStudySolution } from "@/app/modules/case-studies/ui/components/case-study-solution";
import { CaseStudyTestimonialCard } from "@/app/modules/case-studies/ui/components/case-study-testimonial-card";
import { RelatedCaseStudies } from "@/app/modules/case-studies/ui/components/related-case-studies";

export const CaseStudyDetailsView = () => {
  const caseStudyName = "Desert Ridge Agrisolar";
  const subtitle = "Commercial Solar • March 2024 • Arizona, USA";

  return (
    <div className="view-container">
      <PageTitle title={caseStudyName} subtitle={subtitle} />

      {/* TODO: Consider adding breadcrumbs here. */}

      {/* Hero Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <CaseStudyHero />
        </div>
        <div>
          <CaseStudyKeyMetrics />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-8">
          <CaseStudyOverview />
          <CaseStudyChallenge />
          <CaseStudySolution />
          <CaseStudyResults />
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <CaseStudyProjectDetailsCard />
          <CaseStudyMetricsSummaryCard />
          <CaseStudyTestimonialCard />
        </div>
      </div>

      {/* Technical Details Tabs */}
      <div className="mt-10">
        <CaseStudyDetailsTabs />
      </div>

      {/* Related Case Studies */}
      <div className="mt-10">
        <RelatedCaseStudies />
      </div>
    </div>
  );
};
