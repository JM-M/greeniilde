import { PrimaryCta } from "@/app/components/shared/primary-cta/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const faqs = [
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

export const FAQs = () => {
  return (
    <section id="faqs" className="container mx-auto px-4 py-12 space-y-8">
      <h2 className="text-center text-2xl font-semibold">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-2xl space-y-4">
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
      <div className="flex justify-center">
        <PrimaryCta label="Book a project consult" className="max-w-xs" />
      </div>
    </section>
  );
};
