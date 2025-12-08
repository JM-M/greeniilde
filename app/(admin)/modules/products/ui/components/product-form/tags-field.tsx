"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "../../../schemas";

export const TagsField = () => {
  const { control, setValue, watch } = useFormContext<ProductFormValues>();
  const [inputValue, setInputValue] = useState("");
  const tags = watch("tags") || [];

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setValue("tags", [...tags, inputValue.trim()], { shouldValidate: true });
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a tag"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleAddTag}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
                <X className="ml-2 size-3" />
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
