"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { cn } from "@/app/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const formFields = [
  {
    id: "name",
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "080XXXXXXXX",
  },
] as const;

export const ContactFormChannel = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you shortly.",
      });
      reset();
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="grid gap-6 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFields.map((field) => (
        <label
          key={field.id}
          htmlFor={field.id}
          className={cn(
            "text-foreground flex flex-col gap-2 text-sm font-medium",
            {
              "md:col-span-2": field.id === "phone",
            },
          )}
        >
          {field.label}
          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            className={cn(
              "border-border bg-background/70 text-foreground focus:border-primary focus:ring-primary/20 rounded-xl border px-4 py-3 text-base shadow-sm transition outline-none focus:ring-2",
              errors[field.id as keyof ContactFormValues] && "border-red-500",
            )}
            {...register(field.id as keyof ContactFormValues)}
          />
          {errors[field.id as keyof ContactFormValues] && (
            <span className="text-xs text-red-500">
              {errors[field.id as keyof ContactFormValues]?.message}
            </span>
          )}
        </label>
      ))}

      <label
        htmlFor="message"
        className="text-foreground flex flex-col gap-2 text-sm font-medium md:col-span-2"
      >
        Project details
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about the site, timeline, and what success looks like."
          className={cn(
            "border-border bg-background/70 text-foreground focus:border-primary focus:ring-primary/20 rounded-xl border px-4 py-3 text-base shadow-sm transition outline-none focus:ring-2",
            errors.message && "border-red-500",
          )}
          {...register("message")}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message.message}</span>
        )}
      </label>

      <div className="flex flex-col gap-2 sm:justify-between md:col-span-2">
        <p className="text-muted-foreground text-sm">
          You&apos;ll hear back within 30 minutes (Mon–Fri, 8a–6p WAT).
        </p>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner />
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};
