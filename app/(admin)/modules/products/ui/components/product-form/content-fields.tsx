"use client";

import { CategorySelector } from "@/app/(admin)/modules/categories/ui/components/category-selector";
import { MediaItem, MediaUpload } from "@/app/components/shared/media-upload";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "../../../schemas";

export const ContentFields = () => {
  const { control, watch, setValue } = useFormContext<ProductFormValues>();

  return (
    <Card>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="media"
          render={({ field }) => {
            const mediaValue = watch("media") || [];
            const mediaItems: MediaItem[] = mediaValue.map((url, index) => ({
              id: url || `existing-${index}`,
              url,
            }));

            return (
              <FormItem>
                <FormLabel>Media</FormLabel>
                <FormControl>
                  <MediaUpload
                    value={mediaItems}
                    onChange={(files) => {
                      const urls = files.map((f) => f.url);
                      setValue("media", urls, { shouldValidate: true });
                    }}
                    maxFiles={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="grid gap-2 md:grid-cols-2">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelector
                    value={field.value || null}
                    onChange={(value) => field.onChange(value || "")}
                    placeholder="Select a category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
