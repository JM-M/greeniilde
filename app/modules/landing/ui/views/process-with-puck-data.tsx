"use client";

import { useEffect, useState } from "react";
import { Process } from "../components/process";
import type { Data } from "@measured/puck";

type ProcessStep = {
  title: string;
  description: string;
};

export const ProcessWithPuckData = () => {
  const [sectionTitle, setSectionTitle] = useState<string>();
  const [sectionDescription, setSectionDescription] = useState<string>();
  const [steps, setSteps] = useState<ProcessStep[]>();
  const [ctaText, setCtaText] = useState<string>();

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem("puck-data");
    if (saved) {
      try {
        const data: Data = JSON.parse(saved);
        // Find the ProcessSection component in the content
        const processComponent = data.content?.find(
          (item) => item.type === "ProcessSection"
        );
        if (processComponent?.props) {
          if (processComponent.props.sectionTitle) {
            setSectionTitle(processComponent.props.sectionTitle as string);
          }
          if (processComponent.props.sectionDescription) {
            setSectionDescription(
              processComponent.props.sectionDescription as string
            );
          }
          if (processComponent.props.steps) {
            setSteps(processComponent.props.steps as ProcessStep[]);
          }
          if (processComponent.props.ctaText) {
            setCtaText(processComponent.props.ctaText as string);
          }
        }
      } catch (error) {
        console.error("Failed to parse Puck data:", error);
      }
    }
  }, []);

  return (
    <Process
      sectionTitle={sectionTitle}
      sectionDescription={sectionDescription}
      steps={steps}
      ctaText={ctaText}
    />
  );
};
