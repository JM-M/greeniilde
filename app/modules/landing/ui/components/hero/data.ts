export type FocusArea = {
  label: string;
  description: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export const focusAreas: FocusArea[] = [
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

export const heroMetrics: HeroMetric[] = [
  { label: "Installations delivered", value: "450+" },
  { label: "Average payback", value: "3.8 yrs" },
  { label: "System uptime", value: "99.2%" },
  { label: "Customer NPS", value: "74" },
];

export const heroSellingPoints = [
  "Detailed consumption modelling & shading analysis",
  "Tier-1 hardware plus 25-year performance warranties",
  "Remote diagnostics and quarterly performance reports",
];

