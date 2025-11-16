import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

type PrimaryCtaProps = {
  label: string;
  className?: string;
};

export const PrimaryCta = ({ label, className }: PrimaryCtaProps) => (
  <Button size="lg" className={cn("h-14 w-full sm:w-auto", className)}>
    {label}
  </Button>
);
