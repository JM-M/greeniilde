type CaseStudySolutionProps = {
  solution?: string;
};

const defaultSolution =
  "We implemented a comprehensive solar energy system with battery storage, smart monitoring, and grid integration. The solution included custom engineering to meet the client's specific requirements and seamless integration with existing infrastructure.";

export const CaseStudySolution = ({
  solution = defaultSolution,
}: CaseStudySolutionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">The Solution</h2>
      <p className="text-muted-foreground leading-relaxed">{solution}</p>
    </section>
  );
};

