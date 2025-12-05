"use client";

import { getPageContent } from "@/app/lib/actions/content-pages";
import { useEffect, useState } from "react";
import { Process } from "../components/process";

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
    async function loadProcessData() {
      try {
        const pageData = await getPageContent("home");

        if (pageData && pageData.puckData) {
          const data = pageData.puckData;
          const processComponent = data.content?.find(
            (item: any) => item.type === "ProcessSection",
          );
          if (processComponent?.props) {
            if (processComponent.props.sectionTitle) {
              setSectionTitle(processComponent.props.sectionTitle as string);
            }
            if (processComponent.props.sectionDescription) {
              setSectionDescription(
                processComponent.props.sectionDescription as string,
              );
            }
            if (processComponent.props.steps) {
              setSteps(processComponent.props.steps as ProcessStep[]);
            }
            if (processComponent.props.ctaText) {
              setCtaText(processComponent.props.ctaText as string);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load process data from backend:", error);
        // Component will use default props if this fails
      }
    }
    loadProcessData();
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
