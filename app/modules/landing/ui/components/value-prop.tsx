import { Button } from "@/app/components/ui/button";

const features = [
  "High Efficiency Panels",
  "Eco-Friendly Materials",
  "25+ Years Confidence Warranty",
  "Smart Monitoring App",
  "Expert Installation",
];

const stats = [
  { label: "Production", value: "42.3 kWh" },
  { label: "Consumption", value: "36.8 kWh" },
  { label: "Battery", value: "72%" },
];

const Content = () => (
  <div className="flex flex-col gap-6 text-white">
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        <h2 className="text-4xl font-semibold leading-tight text-white">
          Go Solar. Save Big. Live Green.
        </h2>
        <p className="text-white/80">
          Smart energy solutions that save money and protect against rising
          costs.
        </p>
      </div>
    </div>

    <ul className="flex flex-col gap-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
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
      Learn More
    </Button>

    <div className="grid gap-2 sm:gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-center backdrop-blur sm:text-left"
        >
          <div className="sm:text-xl text-lg font-semibold text-white">
            {stat.value}
          </div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const ValueProp = () => {
  return (
    <section className="relative overflow-hidden py-16 text-white bg-">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-2">
          <div className="relative order-1 min-h-[320px] bg-[url('/images/hero.jpg')] bg-cover bg-center lg:order-2 lg:min-h-full" />

          <div className="order-2 border-b border-white/10 bg-slate-950/90 p-8 backdrop-blur lg:order-1 lg:border-b-0 lg:border-r lg:p-10">
            <Content />
          </div>
        </div>
      </div>
    </section>
  );
};
