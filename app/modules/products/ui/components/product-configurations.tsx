"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/button-group";
import { cn } from "@/app/lib/utils";

type ProductConfigurationsProps = {
  className?: string;
};

const capacityOptions = ["4 kW", "6.5 kW", "8 kW"];
const voltageOptions = ["120V", "240V"];

export const ProductConfigurations = ({
  className,
}: ProductConfigurationsProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    capacityOptions[1],
  );
  const [selectedVoltage, setSelectedVoltage] = useState<string>(
    voltageOptions[1],
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <div className="text-sm font-medium">Capacity</div>
        <ButtonGroup>
          {capacityOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant={selectedCapacity === option ? "default" : "outline"}
              onClick={() => setSelectedCapacity(option)}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Voltage</div>
        <ButtonGroup>
          {voltageOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant={selectedVoltage === option ? "default" : "outline"}
              onClick={() => setSelectedVoltage(option)}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Quantity and CTAs moved to ProductPurchaseControls */}
    </div>
  );
};
