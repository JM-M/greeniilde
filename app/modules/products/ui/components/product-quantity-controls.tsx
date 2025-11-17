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
  /**
   * Additional props for the decrement button.
   * onClick will be composed with internal logic.
   */
  minusButtonProps?: React.ComponentProps<typeof Button>;
  /**
   * Additional props for the increment button.
   * onClick will be composed with internal logic.
   */
  plusButtonProps?: React.ComponentProps<typeof Button>;
  /**
   * Additional props for the numeric input.
   * onChange will be composed with internal logic.
   */
  inputProps?: React.ComponentProps<typeof Input>;
};

export const ProductQuantityControls = ({
  value,
  onChange,
  min = 1,
  className,
  minusButtonProps,
  plusButtonProps,
  inputProps,
}: ProductQuantityControlsProps) => {
  const {
    onClick: onDecreaseClick,
    className: minusClassName,
    ...restMinus
  } = minusButtonProps ?? {};
  const {
    onClick: onIncreaseClick,
    className: plusClassName,
    ...restPlus
  } = plusButtonProps ?? {};
  const {
    onChange: onInputChange,
    className: inputClassName,
    min: inputMin,
    ...restInput
  } = inputProps ?? {};

  return (
    <ButtonGroup className={cn(className)}>
      <Button
        type="button"
        variant="outline"
        onClick={(e) => {
          onDecreaseClick?.(e);
          onChange(Math.max(min, value - 1));
        }}
        aria-label="Decrease quantity"
        size="icon"
        className={cn(minusClassName)}
        {...restMinus}
      >
        <MinusIcon />
      </Button>
      <Input
        className={cn("w-16 text-center md:w-20", inputClassName)}
        type="numeric"
        min={inputMin ?? min}
        value={value}
        onChange={(e) => {
          const next = parseInt(e.target.value, 10);
          onInputChange?.(e);
          onChange(next);
        }}
        aria-label="Quantity"
        {...restInput}
      />
      <Button
        type="button"
        variant="outline"
        onClick={(e) => {
          onIncreaseClick?.(e);
          onChange(value + 1);
        }}
        aria-label="Increase quantity"
        size="icon"
        className={cn(plusClassName)}
        {...restPlus}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};
