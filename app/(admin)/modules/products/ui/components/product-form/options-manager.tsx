"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { Label } from "@/app/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues, ProductOption } from "../../../schemas";

export const OptionsManager = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const options = watch("options") || [];

  // Refs for value inputs - Map of "optionIndex-valueIndex" -> input element
  const valueInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  // Track which input to focus after render
  const focusTarget = useRef<string | null>(null);

  // Focus the target input after state update
  useEffect(() => {
    if (focusTarget.current) {
      const input = valueInputRefs.current.get(focusTarget.current);
      if (input) {
        input.focus();
      }
      focusTarget.current = null;
    }
  }, [options]);

  // Register input ref
  const registerInputRef = useCallback(
    (optionIndex: number, valueIndex: number, el: HTMLInputElement | null) => {
      const key = `${optionIndex}-${valueIndex}`;
      if (el) {
        valueInputRefs.current.set(key, el);
      } else {
        valueInputRefs.current.delete(key);
      }
    },
    [],
  );

  // Add a new empty option to the options array
  const addOption = () => {
    setValue("options", [...options, { name: "", values: [""] }], {
      shouldDirty: true,
    });
  };

  // Update a specific option at the given index
  const updateOption = (index: number, option: ProductOption) => {
    const newOptions = [...options];
    newOptions[index] = option;
    setValue("options", newOptions, { shouldDirty: true });
  };

  // Remove an option from the options array
  const removeOption = (index: number) => {
    setValue(
      "options",
      options.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  // Add a new empty value to a specific option's values array
  const addValue = (optionIndex: number, focusNew = false) => {
    const option = options[optionIndex];
    const newValueIndex = option.values.length;
    updateOption(optionIndex, {
      ...option,
      values: [...option.values, ""],
    });
    if (focusNew) {
      focusTarget.current = `${optionIndex}-${newValueIndex}`;
    }
  };

  // Update a specific value within an option's values array
  const updateValue = (
    optionIndex: number,
    valueIndex: number,
    value: string,
  ) => {
    const option = options[optionIndex];
    const newValues = [...option.values];
    newValues[valueIndex] = value;
    updateOption(optionIndex, {
      ...option,
      values: newValues,
    });
  };

  // Remove a specific value from an option's values array
  const removeValue = (optionIndex: number, valueIndex: number) => {
    const option = options[optionIndex];
    updateOption(optionIndex, {
      ...option,
      values: option.values.filter((_, i) => i !== valueIndex),
    });
  };

  // Handle key down on value inputs for comma/enter navigation
  const handleValueKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    optionIndex: number,
    valueIndex: number,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      // Remove trailing comma from current value if comma was pressed
      if (e.key === ",") {
        const currentValue = options[optionIndex].values[valueIndex];
        if (currentValue.endsWith(",")) {
          updateValue(optionIndex, valueIndex, currentValue.slice(0, -1));
        }
      }

      const option = options[optionIndex];
      const isLastValue = valueIndex === option.values.length - 1;

      if (isLastValue) {
        // Add new value and focus it
        addValue(optionIndex, true);
      } else {
        // Focus next value input
        const nextKey = `${optionIndex}-${valueIndex + 1}`;
        const nextInput = valueInputRefs.current.get(nextKey);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-medium">
          Options
          <Button type="button" onClick={addOption} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Option name (e.g., Size, Color)"
                value={option.name}
                onChange={(e) =>
                  updateOption(optionIndex, { ...option, name: e.target.value })
                }
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeOption(optionIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label className="text-sm font-medium">Values</Label>
              <div className="mt-1 space-y-2">
                {option.values.map((value, valueIndex) => (
                  <InputGroup key={valueIndex}>
                    <InputGroupInput
                      ref={(el) =>
                        registerInputRef(optionIndex, valueIndex, el)
                      }
                      placeholder="Value (e.g., Small, Red)"
                      value={value}
                      onChange={(e) =>
                        updateValue(optionIndex, valueIndex, e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleValueKeyDown(e, optionIndex, valueIndex)
                      }
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-xs"
                        onClick={() => removeValue(optionIndex, valueIndex)}
                        disabled={option.values.length === 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addValue(optionIndex)}
                >
                  <Plus />
                  Add Value
                </Button>
              </div>
            </div>
          </div>
        ))}

        {options.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            No options defined. Add options to create product variants.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
