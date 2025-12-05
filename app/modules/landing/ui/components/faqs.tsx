"use client"

import { PrimaryCta } from "@/app/components/shared/primary-cta/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

// Import Puck's registerOverlayPortal to enable interactivity in the editor
let registerOverlayPortal: ((el: HTMLElement) => void) | undefined;
if (typeof window !== "undefined") {
  try {
    const puck = require("@measured/puck");
    registerOverlayPortal = puck.registerOverlayPortal;
  } catch (e) {
    // Puck not available, which is fine for production
  }
}

const defaultFaqs = [
  {
    question: "How soon can I get started?",
    answer:
      "We kick things off within a week after a quick discovery call and agreement on scope.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, we include a maintenance window and flexible retainers for continuous improvements.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across climate tech, circular logistics, and other sustainability-focused sectors.",
  },
];

type FAQsProps = {
  sectionTitle?: string;
  faqs?: { question: string; answer: string }[];
  ctaText?: string;
};

const FAQItem = ({
  faq,
  defaultOpen,
}: {
  faq: { question: string; answer: string };
  defaultOpen: boolean;
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Register the collapsible trigger as an interactive element in Puck
    if (triggerRef.current && registerOverlayPortal) {
      registerOverlayPortal(triggerRef.current);
    }
  }, []);

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className="rounded-lg border bg-background px-4 py-3"
    >
      <CollapsibleTrigger
        ref={triggerRef}
        className="flex w-full items-center justify-between gap-4 text-left font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180"
      >
        <span>{faq.question}</span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 text-sm text-muted-foreground" animate>
        {faq.answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

export const FAQs = ({ sectionTitle, faqs, ctaText }: FAQsProps = {}) => {
  const faqItems = faqs || defaultFaqs;

  return (
    <section id="faqs" className="container mx-auto px-4 py-12 space-y-8">
      <h2 className="text-center text-2xl font-semibold">
        {sectionTitle || "Frequently Asked Questions"}
      </h2>
      <div className="mx-auto max-w-2xl space-y-4">
        {faqItems.map((faq, index) => (
          <FAQItem key={faq.question} faq={faq} defaultOpen={index === 0} />
        ))}
      </div>
      <div className="flex justify-center">
        <PrimaryCta
          label={ctaText || "Book a project consult"}
          className="max-w-xs"
        />
      </div>
    </section>
  );
};
