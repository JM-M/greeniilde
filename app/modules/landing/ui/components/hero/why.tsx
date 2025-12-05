import type { HeroMetric } from "./data";

type HeroWhyProps = {
  title?: string;
  subtitle?: string;
  sellingPoints: string[];
  metrics: HeroMetric[];
};

export const HeroWhy = ({
  title,
  subtitle,
  sellingPoints,
  metrics,
}: HeroWhyProps) => (
  <div className="flex flex-col justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur">
    <div className="space-y-3">
      <p className="text-sm font-semibold tracking-widest text-emerald-200 uppercase">
        Why Greeniilde
      </p>
      <h2 className="text-2xl font-semibold">
        {title || "Engineered systems with proactive monitoring baked in."}
      </h2>
      <p className="text-sm text-white/75">
        {subtitle ||
          "Our in-house team guides permits, installs, and post-install maintenance so you stay online even through extended load-shedding."}
      </p>
    </div>

    <ul className="space-y-3 text-sm text-white/80">
      {sellingPoints.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <div className="grid gap-4 sm:grid-cols-2">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
        >
          <p className="text-3xl font-semibold text-white">{metric.value}</p>
          <p className="mt-1 text-xs tracking-widest text-white/60 uppercase">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  </div>
);
