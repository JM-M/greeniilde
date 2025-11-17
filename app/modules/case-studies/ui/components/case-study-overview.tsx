type CaseStudyOverviewProps = {
  overview?: string;
};

const defaultOverview =
  "This case study showcases a successful renewable energy implementation that transformed the client's energy infrastructure, resulting in significant cost savings and environmental impact.";

export const CaseStudyOverview = ({
  overview = defaultOverview,
}: CaseStudyOverviewProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <p className="text-muted-foreground leading-relaxed">{overview}</p>
    </section>
  );
};

