"use client";

type InstallationStep = {
  phase: string;
  description: string;
  duration?: string;
};

type CaseStudyInstallationProps = {
  className?: string;
  steps?: InstallationStep[];
};

const defaultSteps: InstallationStep[] = [
  {
    phase: "Site Assessment",
    description: "Comprehensive site evaluation, shading analysis, and structural assessment",
    duration: "1 week",
  },
  {
    phase: "Design & Permitting",
    description: "System design, engineering drawings, and permit acquisition",
    duration: "3 weeks",
  },
  {
    phase: "Equipment Procurement",
    description: "Sourcing and delivery of all system components",
    duration: "2 weeks",
  },
  {
    phase: "Installation",
    description: "Mounting system installation, panel mounting, and electrical work",
    duration: "4 weeks",
  },
  {
    phase: "Commissioning",
    description: "System testing, grid connection, and final inspection",
    duration: "1 week",
  },
];

export const CaseStudyInstallation = ({
  className,
  steps = defaultSteps,
}: CaseStudyInstallationProps) => {
  return (
    <div className={className}>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step.phase}</h3>
              </div>
              {step.duration && (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {step.duration}
                </span>
              )}
            </div>
            <p className="ml-11 text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

