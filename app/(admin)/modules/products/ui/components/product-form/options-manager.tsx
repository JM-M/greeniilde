"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues, ProductOption } from "../../../schemas";

export const OptionsManager = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const options = watch("options") || [];

  // Add a new empty option to the options array
  const addOption = () => {
    setValue("options", [...options, { name: "", values: [""] }]);
  };

  // Update a specific option at the given index
  const updateOption = (index: number, option: ProductOption) => {
    const newOptions = [...options];
    newOptions[index] = option;
    setValue("options", newOptions);
  };

  // Remove an option from the options array
  const removeOption = (index: number) => {
    setValue(
      "options",
      options.filter((_, i) => i !== index),
    );
  };

  // Add a new empty value to a specific option's values array
  const addValue = (optionIndex: number) => {
    const option = options[optionIndex];
    updateOption(optionIndex, {
      ...option,
      values: [...option.values, ""],
    });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Product Options
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
                  <div key={valueIndex} className="flex items-center gap-2">
                    <Input
                      placeholder="Value (e.g., Small, Red)"
                      value={value}
                      onChange={(e) =>
                        updateValue(optionIndex, valueIndex, e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValue(optionIndex, valueIndex)}
                      disabled={option.values.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addValue(optionIndex)}
                >
                  <Plus className="mr-2 h-4 w-4" />
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
