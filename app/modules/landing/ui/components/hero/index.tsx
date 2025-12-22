import { HeroActions } from "./actions";
import {
  focusAreas as defaultFocusAreas,
  heroMetrics as defaultMetrics,
  heroSellingPoints as defaultSellingPoints,
  type FocusArea,
  type HeroMetric,
} from "./data";
import { HeroFocusAreas } from "./focus-areas";
import { HeroIntro } from "./intro";
import { HeroWhy } from "./why";

export const Hero = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  focusAreas,
  whyTitle,
  whySubtitle,
  sellingPoints,
  metrics,
  backgroundImage,
}: {
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  focusAreas?: FocusArea[];
  whyTitle?: string;
  whySubtitle?: string;
  sellingPoints?: string[];
  metrics?: HeroMetric[];
  backgroundImage?: string;
} = {}) => {
  return (
    <header
      id="hero"
      className="relative -mt-14 overflow-hidden bg-[#040b06] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('${backgroundImage || "/images/hero.jpg"}')`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#07150d,transparent_60%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-240 -translate-x-1/4 rounded-full bg-emerald-700/15 blur-3xl lg:block" />

      <div className="relative z-10 container mx-auto grid min-h-[min(60rem,100vh)] gap-12 px-4 pt-28 pb-16 lg:max-w-3xl">
        <div className="flex flex-col justify-center space-y-10">
          <HeroIntro
            title={
              title ||
              "Save on electricity with reliable, maintenance-free solar power."
            }
            description={
              description ||
              "We design, supply, and install turnkey residential and commercial solar systems across Nigeria—built for uptime, backed by proactive monitoring, and tailored to your energy profile."
            }
          />
          <HeroActions primaryCta={primaryCta || "Get a free quote"} />
          <HeroFocusAreas areas={focusAreas || defaultFocusAreas} />
        </div>

        <HeroWhy
          title={whyTitle}
          subtitle={whySubtitle}
          sellingPoints={sellingPoints || defaultSellingPoints}
          metrics={metrics || defaultMetrics}
        />
      </div>
    </header>
  );
};
