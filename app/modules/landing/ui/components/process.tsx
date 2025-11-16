const steps = [
  {
    title: "Free Assessment",
    description:
      "We evaluate your energy needs, roof/ground conditions, and budget through a quick site visit or virtual consultation to recommend the right system.",
  },
  {
    title: "Custom Design",
    description:
      "Our engineers design a tailored solar system, selecting components for maximum efficiency and savings, and provide a clear proposal with an ROI estimate.",
  },
  {
    title: "Professional Installation",
    description:
      "Certified technicians handle mounting, wiring, safety checks, and grid connection while we take care of all permits and inspections.",
  },
  {
    title: "Monitoring & Maintenance",
    description:
      "We monitor system performance in real time and offer support and maintenance plans to keep your system running at peak efficiency.",
  },
];

export const Process = () => {
  return (
    <section className="container px-4 py-10 mx-auto">
      <div className="flex flex-col items-center space-y-8 text-center">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="flex flex-col items-center space-y-4"
          >
            <div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-xl">
                {step.description}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div className="h-12 w-px bg-border" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
