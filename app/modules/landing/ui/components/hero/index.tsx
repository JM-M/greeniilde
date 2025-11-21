import { HeroActions } from "./actions";
import { focusAreas, heroMetrics, heroSellingPoints } from "./data";
import { HeroFocusAreas } from "./focus-areas";
import { HeroIntro } from "./intro";
import { HeroWhy } from "./why";

export const Hero = () => {
  return (
    <header
      id="hero"
      className="relative -mt-14 overflow-hidden bg-[#040b06] bg-[url('/images/hero.jpg')] bg-cover bg-center text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#07150d,transparent_60%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-240 -translate-x-1/4 rounded-full bg-emerald-700/15 blur-3xl lg:block" />

      <div className="relative z-10 container mx-auto grid min-h-[min(60rem,100vh)] gap-12 px-4 pt-28 pb-16 lg:max-w-3xl">
        <div className="flex flex-col justify-center space-y-10">
          <HeroIntro
            title="Save on electricity with reliable, maintenance-free solar power."
            description="We design, supply, and install turnkey residential and commercial solar systems across Nigeria—built for uptime, backed by proactive monitoring, and tailored to your energy profile."
          />
          <HeroActions
            primaryCta="Book a project consult"
            secondaryCta="Get in touch"
          />
          <HeroFocusAreas areas={focusAreas} />
        </div>

        <HeroWhy sellingPoints={heroSellingPoints} metrics={heroMetrics} />
      </div>
    </header>
  );
};
