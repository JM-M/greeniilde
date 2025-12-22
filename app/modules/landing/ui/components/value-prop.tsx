import { PrimaryCta } from "@/app/components/shared/primary-cta/button";
import { Button } from "@/app/components/ui/button";

const defaultFeatures = [
  "High Efficiency Panels",
  "Eco-Friendly Materials",
  "25+ Years Confidence Warranty",
  "Smart Monitoring App",
  "Expert Installation",
];

const defaultStats = [
  { label: "Production", value: "42.3 kWh" },
  { label: "Consumption", value: "36.8 kWh" },
  { label: "Battery", value: "72%" },
];

type ValuePropProps = {
  title?: string;
  subtitle?: string;
  features?: string[];
  buttonText?: string;
  stats?: { label: string; value: string }[];
  ctaText?: string;
  videoSrc?: string;
};

const Content = ({
  title,
  subtitle,
  features,
  buttonText,
  stats,
}: Pick<
  ValuePropProps,
  "title" | "subtitle" | "features" | "buttonText" | "stats"
>) => (
  <div className="flex flex-col gap-6 text-white">
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        <h2 className="text-4xl leading-tight font-semibold text-white">
          {title || "Go Solar. Save Big. Live Green."}
        </h2>
        <p className="text-white/80">
          {subtitle ||
            "Smart energy solutions that save money and protect against rising costs."}
        </p>
      </div>
    </div>

    <ul className="flex flex-col gap-2">
      {(features || defaultFeatures).map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-300" />
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>

    <Button
      size="lg"
      variant="outline"
      className="self-start rounded-full border-white/40 bg-white/10 px-8 text-white hover:bg-white/20"
    >
      {buttonText || "Learn More"}
    </Button>

    <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
      {(stats || defaultStats).map((stat, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-center backdrop-blur sm:text-left"
        >
          <div className="text-lg font-semibold text-white sm:text-xl">
            {stat.value}
          </div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const ValueProp = ({
  title,
  subtitle,
  features,
  buttonText,
  stats,
  ctaText,
  videoSrc,
}: ValuePropProps = {}) => {
  return (
    <section
      id="value-prop"
      className="bg-secondary relative overflow-hidden py-16 text-white"
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-2">
          <video
            className="relative order-1 min-h-[320px] w-full object-cover lg:order-2 lg:min-h-full"
            src={videoSrc || "/videos/installation.mp4"}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="order-2 border-b border-white/10 bg-slate-950/90 p-8 backdrop-blur lg:order-1 lg:border-r lg:border-b-0 lg:p-10">
            <Content
              title={title}
              subtitle={subtitle}
              features={features}
              buttonText={buttonText}
              stats={stats}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <PrimaryCta
            label={ctaText || "Get a free quote"}
            className="max-w-xs"
          />
        </div>
      </div>
    </section>
  );
};
