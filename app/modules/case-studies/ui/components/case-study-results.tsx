type CaseStudyResultsProps = {
  results?: string;
};

const defaultResults =
  "The implementation exceeded expectations, delivering immediate cost savings, improved energy reliability, and significant environmental benefits. The client achieved their sustainability targets ahead of schedule and has since expanded the system.";

export const CaseStudyResults = ({
  results = defaultResults,
}: CaseStudyResultsProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Results & Impact</h2>
      <p className="text-muted-foreground leading-relaxed">{results}</p>
    </section>
  );
};

