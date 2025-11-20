"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/app/lib/utils";

export type ComboboxItem = {
  value: string;
  label: string;
  // Optional searchable keywords (will be included in the CommandItem value)
  keywords?: string[];
  // Optional disabled state for individual items
  disabled?: boolean;
};

export type ComboboxProps = {
  items: ComboboxItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  // When true, selecting the already-selected value clears it
  allowClearOnReselect?: boolean;
};

/**
 * Reusable Combobox built with Popover + Command primitives.
 * Based on shadcn/ui Combobox pattern.
 */
export const Combobox: React.FC<ComboboxProps> = ({
  items,
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  buttonClassName,
  popoverClassName,
  className,
  disabled,
  ariaLabel,
  allowClearOnReselect = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | null
  >(defaultValue ?? null);

  const selectedValue =
    (isControlled ? controlledValue : uncontrolledValue) ?? null;

  const setSelectedValue = React.useCallback(
    (next: string | null) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const selectedLabel =
    selectedValue != null
      ? (items.find((i) => i.value === selectedValue)?.label ?? null)
      : null;

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={ariaLabel}
            disabled={disabled}
            className={cn("w-full justify-between", buttonClassName)}
          >
            {selectedLabel ?? placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-[--radix-popover-trigger-width] p-0",
            popoverClassName,
          )}
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedValue === item.value;
                  const valueForSearch = [
                    item.value,
                    item.label,
                    ...(item.keywords ?? []),
                  ]
                    .join(" ")
                    .toLowerCase();
                  return (
                    <CommandItem
                      key={item.value}
                      value={valueForSearch}
                      disabled={item.disabled}
                      onSelect={() => {
                        if (allowClearOnReselect && isSelected) {
                          setSelectedValue(null);
                        } else {
                          setSelectedValue(item.value);
                        }
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

Combobox.displayName = "Combobox";
