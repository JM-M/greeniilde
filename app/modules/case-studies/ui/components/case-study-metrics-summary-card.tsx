import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type Metric = {
  label: string;
  value: string;
  unit?: string;
};

type CaseStudyMetricsSummaryCardProps = {
  metrics?: Metric[];
};

const defaultMetrics: Metric[] = [
  {
    label: "Energy Generated",
    value: "2.5",
    unit: "MWh/year",
  },
  {
    label: "Cost Savings",
    value: "$45,000",
    unit: "annually",
  },
  {
    label: "ROI",
    value: "18",
    unit: "%",
  },
  {
    label: "Carbon Reduction",
    value: "1,200",
    unit: "tons CO₂",
  },
];

export const CaseStudyMetricsSummaryCard = ({
  metrics = defaultMetrics,
}: CaseStudyMetricsSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">
                {metric.label}
                {metric.unit && (
                  <span className="ml-1 text-xs">({metric.unit})</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

