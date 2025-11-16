import { Button } from "@/app/components/ui/button";

const focusAreas = [
  {
    label: "Panels",
    description: "Premium mono & bifacial modules engineered for African sun.",
  },
  {
    label: "Inverters",
    description: "Hybrid-ready systems with remote diagnostics baked in.",
  },
  {
    label: "Storage",
    description: "Lithium battery banks sized for homes, farms, and SMEs.",
  },
  {
    label: "Solar Pumps",
    description: "Efficient irrigation kits for boreholes and reservoirs.",
  },
];

const heroMetrics = [
  { label: "Installations delivered", value: "450+" },
  { label: "Average payback", value: "3.8 yrs" },
  { label: "System uptime", value: "99.2%" },
  { label: "Customer NPS", value: "74" },
];

export const Hero = () => {
  return (
    <header
      id="hero"
      className="relative overflow-hidden bg-[#040b06] text-white bg-[url('/images/hero.jpg')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#07150d,transparent_60%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-240 -translate-x-1/4 rounded-full bg-emerald-700/15 blur-3xl lg:block" />

      <div className="container relative z-10 mx-auto grid min-h-[min(60rem,100vh)] gap-12 px-4 pb-16 pt-28 lg:max-w-3xl">
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <div className="space-y-4 text-left lg:text-center">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Save on electricity with reliable, maintenance-free solar power.
              </h1>
              <p className="max-w-2xl text-base text-white/80 sm:text-lg">
                We design, supply, and install turnkey residential and
                commercial solar systems across Nigeria—built for uptime, backed
                by proactive monitoring, and tailored to your energy profile.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-center">
            <Button
              size="lg"
              className="h-14 lg:flex-[unset] sm:flex-1 w-full sm:w-auto"
            >
              Book a project consult
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 lg:flex-[unset] sm:flex-1 w-full border-white/30 text-foreground sm:w-auto"
            >
              Download spec sheet
            </Button>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Solutions we specialise in
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <div
                  key={area.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {area.label}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Why Greeniilde
            </p>
            <h2 className="text-2xl font-semibold">
              Engineered systems with proactive monitoring baked in.
            </h2>
            <p className="text-sm text-white/75">
              Our in-house team guides permits, installs, and post-install
              maintenance so you stay online even through extended
              load-shedding.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-white/80">
            {[
              "Detailed consumption modelling & shading analysis",
              "Tier-1 hardware plus 25-year performance warranties",
              "Remote diagnostics and quarterly performance reports",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
              >
                <p className="text-3xl font-semibold text-white">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
