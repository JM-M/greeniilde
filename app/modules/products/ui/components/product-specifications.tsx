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

type ProductSpecificationsProps = {
  className?: string;
  specs?: Specification[];
};

const defaultSpecs: Specification[] = [
  { label: "Output", value: "6.5 kW" },
  { label: "Efficiency", value: "98%" },
  { label: "Dimensions", value: "1700 × 1000 × 35 mm" },
  { label: "Weight", value: "19.5 kg" },
  { label: "Operating Temp.", value: "-40°C to 85°C" },
  { label: "Warranty", value: "25 years" },
  { label: "Certifications", value: "IEC 61215 / 61730" },
];

export const ProductSpecifications = ({
  className,
  specs = defaultSpecs,
}: ProductSpecificationsProps) => {
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
