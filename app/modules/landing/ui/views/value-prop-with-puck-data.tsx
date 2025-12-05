"use client";

import { useEffect, useState } from "react";
import { ValueProp } from "../components/value-prop";
import type { Data } from "@measured/puck";

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
    // Load data from localStorage
    const saved = localStorage.getItem("puck-data");
    if (saved) {
      try {
        const data: Data = JSON.parse(saved);
        // Find the ValuePropSection component in the content
        const valuePropComponent = data.content?.find(
          (item) => item.type === "ValuePropSection"
        );
        if (valuePropComponent?.props) {
          if (valuePropComponent.props.title) {
            setTitle(valuePropComponent.props.title as string);
          }
          if (valuePropComponent.props.subtitle) {
            setSubtitle(valuePropComponent.props.subtitle as string);
          }
          if (valuePropComponent.props.features) {
            // Convert array of {feature: string} to array of strings
            const featureArray = (
              valuePropComponent.props.features as { feature: string }[]
            ).map((f) => f.feature);
            setFeatures(featureArray);
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
      } catch (error) {
        console.error("Failed to parse Puck data:", error);
      }
    }
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
