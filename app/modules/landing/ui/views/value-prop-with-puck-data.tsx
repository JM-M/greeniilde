"use client";

import { getPageContent } from "@/app/lib/actions/content-pages";
import { useEffect, useState } from "react";
import { ValueProp } from "../components/value-prop";

type ValuePropStat = {
  label: string;
  value: string;
};

export const ValuePropWithPuckData = () => {
  const [title, setTitle] = useState<string>();
  const [subtitle, setSubtitle] = useState<string>();
  const [features, setFeatures] = useState<string[]>();
  const [buttonText, setButtonText] = useState<string>();
  const [stats, setStats] = useState<ValuePropStat[]>();
  const [ctaText, setCtaText] = useState<string>();
  const [videoSrc, setVideoSrc] = useState<string>();

  useEffect(() => {
    async function loadValuePropData() {
      try {
        const pageData = await getPageContent("home");

        if (pageData && pageData.puckData) {
          const data = pageData.puckData;
          const valuePropComponent = data.content?.find(
            (item: any) => item.type === "ValuePropSection",
          );
          if (valuePropComponent?.props) {
            if (valuePropComponent.props.title) {
              setTitle(valuePropComponent.props.title as string);
            }
            if (valuePropComponent.props.subtitle) {
              setSubtitle(valuePropComponent.props.subtitle as string);
            }
            if (valuePropComponent.props.features) {
              const featuresList = (
                valuePropComponent.props.features as { feature: string }[]
              ).map((f) => f.feature);
              setFeatures(featuresList);
            }
            if (valuePropComponent.props.buttonText) {
              setButtonText(valuePropComponent.props.buttonText as string);
            }
            if (valuePropComponent.props.stats) {
              setStats(valuePropComponent.props.stats as ValuePropStat[]);
            }
            if (valuePropComponent.props.ctaText) {
              setCtaText(valuePropComponent.props.ctaText as string);
            }
            if (valuePropComponent.props.videoSrc) {
              setVideoSrc(valuePropComponent.props.videoSrc as string);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load value prop data from backend:", error);
        // Component will use default props if this fails
      }
    }
    loadValuePropData();
  }, []);

  return (
    <ValueProp
      title={title}
      subtitle={subtitle}
      features={features}
      buttonText={buttonText}
      stats={stats}
      ctaText={ctaText}
      videoSrc={videoSrc}
    />
  );
};
