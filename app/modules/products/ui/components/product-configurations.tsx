"use client";

import { useEffect } from "react";

import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/button-group";
import { Skeleton } from "@/app/components/ui/skeleton";
import { cn } from "@/app/lib/utils";
import { useProductDetailsContext } from "../contexts/product-details-context";

export type Configuration = {
  id: string;
  name: string;
  options: string[];
};

type ProductConfigurationsProps = {
  className?: string;
  configurations: Configuration[];
};

export const ProductConfigurations = ({
  className,
  configurations,
}: ProductConfigurationsProps) => {
  const {
    selectedConfigurations,
    setConfiguration,
    setSelectedConfigurations,
  } = useProductDetailsContext();

  // Update selected configurations when configurations change (e.g., switching products)
  useEffect(() => {
    const updatedValues: Record<string, string> = {};
    let hasChanges = false;

    configurations.forEach((config) => {
      const newValue =
        selectedConfigurations[config.id] || config.options[0] || "";
      updatedValues[config.id] = newValue;

      // Check if this is actually different from current state
      if (selectedConfigurations[config.id] !== newValue) {
        hasChanges = true;
      }
    });

    // Only update if there are actual changes
    if (hasChanges) {
      setSelectedConfigurations(updatedValues);
    }
  }, [configurations, selectedConfigurations, setSelectedConfigurations]);

  const handleConfigurationChange = (configId: string, value: string) => {
    setConfiguration(configId, value);
  };

  const hasOneConfigWithOneOption =
    configurations.length === 1 && configurations[0].options.length === 1;

  if (!configurations.length || hasOneConfigWithOneOption) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {configurations.map((config) => (
        <div key={config.id} className="space-y-2">
          <div className="text-sm font-medium">{config.name}</div>
          <ButtonGroup>
            {config.options.map((option) => (
              <Button
                key={option}
                type="button"
                variant={
                  selectedConfigurations[config.id] === option
                    ? "default"
                    : "outline"
                }
                onClick={() => handleConfigurationChange(config.id, option)}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      ))}

      {/* Quantity and CTAs moved to ProductPurchaseControls */}
    </div>
  );
};

export const ProductConfigurationsSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};
