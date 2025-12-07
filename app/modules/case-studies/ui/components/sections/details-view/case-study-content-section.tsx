import { CaseStudyOverview } from "../../case-study-overview";

type CaseStudyContentSectionProps = {
  overview: string;
};

export const CaseStudyContentSection = ({
  overview,
}: CaseStudyContentSectionProps) => {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-8">
        <CaseStudyOverview overview={overview} />
      </div>
      <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
        {/* Reserved for future content like testimonials, metrics */}
      </div>
    </section>
  );
};
