"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

type PerformanceMetric = {
  period: string;
  energyGenerated: string;
  costSavings: string;
  carbonReduction: string;
};

type CaseStudyPerformanceProps = {
  className?: string;
  metrics?: PerformanceMetric[];
};

const defaultMetrics: PerformanceMetric[] = [
  {
    period: "Month 1",
    energyGenerated: "42.5 MWh",
    costSavings: "$3,800",
    carbonReduction: "20.4 tons",
  },
  {
    period: "Month 3",
    energyGenerated: "125.0 MWh",
    costSavings: "$11,250",
    carbonReduction: "60.0 tons",
  },
  {
    period: "Month 6",
    energyGenerated: "250.0 MWh",
    costSavings: "$22,500",
    carbonReduction: "120.0 tons",
  },
  {
    period: "Year 1 (Projected)",
    energyGenerated: "2,500 MWh",
    costSavings: "$225,000",
    carbonReduction: "1,200 tons",
  },
];

export const CaseStudyPerformance = ({
  className,
  metrics = defaultMetrics,
}: CaseStudyPerformanceProps) => {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Energy Generated</TableHead>
            <TableHead>Cost Savings</TableHead>
            <TableHead>Carbon Reduction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.period}>
              <TableCell className="font-medium">{metric.period}</TableCell>
              <TableCell>{metric.energyGenerated}</TableCell>
              <TableCell>{metric.costSavings}</TableCell>
              <TableCell>{metric.carbonReduction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

