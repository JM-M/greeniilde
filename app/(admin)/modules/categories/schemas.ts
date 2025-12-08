"use client";

import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  description: z.string().optional(),
  handle: z.string().optional(),
  isActive: z.boolean().optional(),
  isInternal: z.boolean().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
