"use client";

import { getPageContent } from "@/app/lib/actions/content-pages";
import type { Data } from "@measured/puck";
import { useEffect, useState } from "react";
import { FAQs } from "../components/faqs";

type FAQItem = {
  question: string;
  answer: string;
};

export const FAQsWithPuckData = () => {
  const [sectionTitle, setSectionTitle] = useState<string>();
  const [faqs, setFaqs] = useState<FAQItem[]>();
  const [ctaText, setCtaText] = useState<string>();

  useEffect(() => {
    async function loadFAQsData() {
      try {
        const pageData = await getPageContent("home");

        if (pageData && pageData.puckData) {
          const data: Data = pageData.puckData;
          const faqsComponent = data.content?.find(
            (item: any) => item.type === "FAQsSection",
          );
          if (faqsComponent?.props) {
            if (faqsComponent.props.sectionTitle) {
              setSectionTitle(faqsComponent.props.sectionTitle as string);
            }
            if (faqsComponent.props.faqs) {
              setFaqs(faqsComponent.props.faqs as FAQItem[]);
            }
            if (faqsComponent.props.ctaText) {
              setCtaText(faqsComponent.props.ctaText as string);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load FAQs data from backend:", error);
        // Component will use default props if this fails
      }
    }
    loadFAQsData();
  }, []);

  return <FAQs sectionTitle={sectionTitle} faqs={faqs} ctaText={ctaText} />;
};
