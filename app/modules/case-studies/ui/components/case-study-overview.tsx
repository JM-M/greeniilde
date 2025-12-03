type CaseStudyOverviewProps = {
  overview: string;
};

export const CaseStudyOverview = ({ overview }: CaseStudyOverviewProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <p className="text-muted-foreground leading-relaxed">{overview}</p>
    </section>
  );
};
