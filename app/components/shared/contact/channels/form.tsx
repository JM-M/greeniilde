"use client";

import type { FormEvent } from "react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

const formFields = [
  { id: "name", label: "Full name", type: "text", placeholder: "Adaeze Okoye" },
  {
    id: "email",
    label: "Business email",
    type: "email",
    placeholder: "adaeze@solarsupply.ng",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+234 801 234 5678",
  },
];

export const ContactFormChannel = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <label
          key={field.id}
          htmlFor={field.id}
          className={cn(
            "flex flex-col gap-2 text-sm font-medium text-foreground",
            {
              "md:col-span-2": field.id === "phone",
            }
          )}
        >
          {field.label}
          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            className="rounded-xl border border-border bg-background/70 px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </label>
      ))}

      <label
        htmlFor="message"
        className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-foreground"
      >
        Project details
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about the site, timeline, and what success looks like."
          className="rounded-xl border border-border bg-background/70 px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          required
        />
      </label>

      <div className="md:col-span-2 flex flex-col gap-2 sm:justify-between">
        <p className="text-sm text-muted-foreground">
          You&apos;ll hear back within 30 minutes (Mon–Fri, 8a–6p WAT).
        </p>
        <Button type="submit" size="lg" className="h-12 px-8">
          Submit project brief
        </Button>
      </div>
    </form>
  );
};
