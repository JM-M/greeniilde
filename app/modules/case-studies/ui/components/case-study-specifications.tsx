"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

type Specification = {
  label: string;
  value: string;
};

type CaseStudySpecificationsProps = {
  className?: string;
  specs?: Specification[];
};

const defaultSpecs: Specification[] = [
  { label: "System Capacity", value: "500 kW" },
  { label: "Panel Type", value: "Monocrystalline" },
  { label: "Battery Capacity", value: "200 kWh" },
  { label: "Inverter Type", value: "Hybrid Smart Inverter" },
  { label: "Grid Connection", value: "Net Metering" },
  { label: "Monitoring", value: "Cloud-based Platform" },
  { label: "Installation Date", value: "March 2024" },
  { label: "Warranty", value: "25 years" },
];

export const CaseStudySpecifications = ({
  className,
  specs = defaultSpecs,
}: CaseStudySpecificationsProps) => {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Specification</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map((spec) => (
            <TableRow key={spec.label}>
              <TableCell className="font-medium">{spec.label}</TableCell>
              <TableCell>{spec.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

