"use client";

import { useEffect, useState } from "react";
import { FAQs } from "../components/faqs";
import type { Data } from "@measured/puck";

type FAQItem = {
  question: string;
  answer: string;
};

export const FAQsWithPuckData = () => {
  const [sectionTitle, setSectionTitle] = useState<string>();
  const [faqs, setFaqs] = useState<FAQItem[]>();
  const [ctaText, setCtaText] = useState<string>();

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem("puck-data");
    if (saved) {
      try {
        const data: Data = JSON.parse(saved);
        // Find the FAQsSection component in the content
        const faqsComponent = data.content?.find(
          (item) => item.type === "FAQsSection"
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
      } catch (error) {
        console.error("Failed to parse Puck data:", error);
      }
    }
  }, []);

  return <FAQs sectionTitle={sectionTitle} faqs={faqs} ctaText={ctaText} />;
};
