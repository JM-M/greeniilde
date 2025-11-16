import { SectionHeader } from "@/app/components/shared/section-header";

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
    <section className="container mx-auto px-4 py-16 space-y-6">
      <SectionHeader
        title="Our Process"
        description="We follow a simple process to install your solar system."
      />
      <div className="flex flex-col items-center text-center pt-16">
        {steps.map((step, idx) => (
          <div key={step.title} className="flex flex-col items-center ">
            <div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-xl">
                {step.description}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div className="h-60 w-px bg-border my-4" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
