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
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        <h2 className="text-4xl font-semibold leading-tight">
          Go Solar. Save Big. Live Green.
        </h2>
        <p>
          Smart energy solutions that save money and protect against rising
          costs.
        </p>
      </div>
    </div>

    <ul className="flex flex-col gap-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-current" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <Button
      size="lg"
      variant="outline"
      className="self-start rounded-full px-8"
    >
      Learn More
    </Button>

    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl px-4 py-3 text-center sm:text-left"
        >
          <div className="text-xl font-semibold">{stat.value}</div>
          <div className="text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const ValueProp = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid gap-8 overflow-hidden rounded-3xl lg:grid-cols-2">
        <div className="relative order-1 min-h-[360px] lg:order-2 lg:min-h-full">
          <div className="h-full w-full bg-secondary" />
          <div className="absolute inset-0 bg-black/30 lg:hidden" />
          <div className="absolute inset-0 p-6 text-white lg:hidden">
            <Content />
          </div>
        </div>

        <div className="order-2 hidden bg-white p-10 lg:order-1 lg:block">
          <Content />
        </div>
      </div>
    </section>
  );
};
