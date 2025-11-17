import { PageTitle } from "@/app/components/shared/page-title";
import { CaseStudiesGrid } from "@/app/modules/case-studies/ui/components/case-studies-grid";

export const CaseStudiesView = () => {
  return (
    <div className="view-container">
      <PageTitle title="Case Studies" />
      <div className="mt-4">
        <CaseStudiesGrid />
      </div>
    </div>
  );
};

