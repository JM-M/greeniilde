"use client";

import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/button-group";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

type ProductQuantityControlsProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  className?: string;
};

export const ProductQuantityControls = ({
  value,
  onChange,
  min = 1,
  className,
}: ProductQuantityControlsProps) => {
  return (
    <ButtonGroup className={cn(className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
        size="icon"
      >
        <MinusIcon />
      </Button>
      <Input
        className="w-16 text-center md:w-20"
        type="numeric"
        min={min}
        value={value}
        onChange={(e) => {
          const next = parseInt(e.target.value, 10);
          onChange(Number.isNaN(next) ? min : Math.max(min, next));
        }}
        aria-label="Quantity"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        size="icon"
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};
