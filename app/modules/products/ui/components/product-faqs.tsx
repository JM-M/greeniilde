"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type ProductFaq = {
  question: string;
  answer: string;
};

type ProductFaqsProps = {
  className?: string;
  faqs?: ProductFaq[];
};

const defaultFaqs: ProductFaq[] = [
  {
    question: "Does this product include installation?",
    answer:
      "Installation is not included by default. We can connect you with certified installers in your area.",
  },
  {
    question: "What is the warranty coverage?",
    answer:
      "The product includes a manufacturer warranty. Please refer to the product page for specific terms.",
  },
  {
    question: "Is it compatible with my existing system?",
    answer:
      "Compatibility depends on your inverter and system configuration. Contact support to verify your setup.",
  },
];

export const ProductFaqs = ({ className, faqs = defaultFaqs }: ProductFaqsProps) => {
  return (
    <div className={className}>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <Collapsible
            key={faq.question}
            defaultOpen={index === 0}
            className="rounded-lg border bg-background px-4 py-3"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 text-left font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180">
              <span>{faq.question}</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent
              className="pt-2 text-sm text-muted-foreground"
              animate
            >
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};


