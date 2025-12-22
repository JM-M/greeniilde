import { PrimaryCta } from "@/app/components/shared/primary-cta/button";

type HeroActionsProps = {
  primaryCta: string;
};

export const HeroActions = ({ primaryCta }: HeroActionsProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-center">
    <PrimaryCta label={primaryCta} className="sm:flex-1 lg:flex-[unset]" />
  </div>
);
