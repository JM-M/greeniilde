"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";

type DeliveryFormValues = {
  method: "standard" | "express" | "overnight";
};

export const DeliveryMethods = () => {
  const form = useForm<DeliveryFormValues>({
    defaultValues: { method: "standard" },
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <div className="flex flex-col gap-3">
        <div className="text-base font-semibold">Delivery method</div>

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormItem className="rounded-lg border p-3">
                <label className="flex items-start gap-3">
                  <FormControl>
                    <Input
                      type="radio"
                      value="standard"
                      checked={field.value === "standard"}
                      onChange={() => field.onChange("standard")}
                      className="mt-1 size-4"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="mb-0 text-base">Standard</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      3–5 business days · $5.00
                    </div>
                  </div>
                </label>
              </FormItem>

              <FormItem className="rounded-lg border p-3">
                <label className="flex items-start gap-3">
                  <FormControl>
                    <Input
                      type="radio"
                      value="express"
                      checked={field.value === "express"}
                      onChange={() => field.onChange("express")}
                      className="mt-1 size-4"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="mb-0 text-base">Express</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      1–2 business days · $15.00
                    </div>
                  </div>
                </label>
              </FormItem>

              <FormItem className="rounded-lg border p-3">
                <label className="flex items-start gap-3">
                  <FormControl>
                    <Input
                      type="radio"
                      value="overnight"
                      checked={field.value === "overnight"}
                      onChange={() => field.onChange("overnight")}
                      className="mt-1 size-4"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="mb-0 text-base">Overnight</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      Next business day · $25.00
                    </div>
                  </div>
                </label>
              </FormItem>
            </div>
          )}
        />
      </div>
    </Form>
  );
};
