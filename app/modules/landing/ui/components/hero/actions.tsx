import { PrimaryCta } from "@/app/components/shared/primary-cta";
import { Button } from "@/app/components/ui/button";

type HeroActionsProps = {
  primaryCta: string;
  secondaryCta: string;
};

export const HeroActions = ({ primaryCta, secondaryCta }: HeroActionsProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-center">
    <PrimaryCta label={primaryCta} className="lg:flex-[unset] sm:flex-1" />
    <Button
      size="lg"
      variant="outline"
      className="h-14 lg:flex-[unset] sm:flex-1 w-full border-white/30 text-foreground sm:w-auto"
    >
      {secondaryCta}
    </Button>
  </div>
);
