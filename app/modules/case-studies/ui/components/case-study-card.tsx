import { cn } from "@/app/lib/utils";

type CaseStudyCardProps = {
  name: string;
  className?: string;
};

export const CaseStudyCard = ({ name, className }: CaseStudyCardProps) => {
  return (
    <div
      className={cn(
        "border rounded-xl p-4 space-y-2 bg-card cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      <div className="w-full aspect-4/3 rounded-lg bg-secondary" />
      <div>
        <p className="text-lg font-semibold">{name}</p>
        {/* <p className="text-sm text-muted-foreground">
          Coming soon: metrics & outcomes
        </p> */}
      </div>
    </div>
  );
};

