import type { FocusArea } from "./data";

type HeroFocusAreasProps = {
  areas: FocusArea[];
};

export const HeroFocusAreas = ({ areas }: HeroFocusAreasProps) => (
  <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
      Solutions we specialise in
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      {areas.map((area) => (
        <div
          key={area.label}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
        >
          <p className="text-sm font-semibold text-white">{area.label}</p>
          <p className="mt-2 text-sm text-white/70">{area.description}</p>
        </div>
      ))}
    </div>
  </div>
);

