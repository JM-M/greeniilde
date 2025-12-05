"use client";

import { useEffect, useState } from "react";
import { Hero } from "../components/hero";
import type { Data } from "@measured/puck";

type FocusArea = {
  label: string;
  description: string;
};

type HeroMetric = {
  label: string;
  value: string;
};

export const HeroWithPuckData = () => {
  const [heroTitle, setHeroTitle] = useState<string>();
  const [heroDescription, setHeroDescription] = useState<string>();
  const [primaryCta, setPrimaryCta] = useState<string>();
  const [secondaryCta, setSecondaryCta] = useState<string>();
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>();
  const [whyTitle, setWhyTitle] = useState<string>();
  const [whySubtitle, setWhySubtitle] = useState<string>();
  const [sellingPoints, setSellingPoints] = useState<string[]>();
  const [metrics, setMetrics] = useState<HeroMetric[]>();

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem("puck-data");
    if (saved) {
      try {
        const data: Data = JSON.parse(saved);
        // Find the HeroTitle component in the content
        const heroTitleComponent = data.content?.find(
          (item) => item.type === "HeroTitle"
        );
        if (heroTitleComponent?.props) {
          if (heroTitleComponent.props.title) {
            setHeroTitle(heroTitleComponent.props.title as string);
          }
          if (heroTitleComponent.props.description) {
            setHeroDescription(heroTitleComponent.props.description as string);
          }
          if (heroTitleComponent.props.primaryCta) {
            setPrimaryCta(heroTitleComponent.props.primaryCta as string);
          }
          if (heroTitleComponent.props.secondaryCta) {
            setSecondaryCta(heroTitleComponent.props.secondaryCta as string);
          }
          if (heroTitleComponent.props.focusAreas) {
            setFocusAreas(heroTitleComponent.props.focusAreas as FocusArea[]);
          }
          if (heroTitleComponent.props.whyTitle) {
            setWhyTitle(heroTitleComponent.props.whyTitle as string);
          }
          if (heroTitleComponent.props.whySubtitle) {
            setWhySubtitle(heroTitleComponent.props.whySubtitle as string);
          }
          if (heroTitleComponent.props.sellingPoints) {
            // Convert array of {point: string} to array of strings
            const points = (
              heroTitleComponent.props.sellingPoints as { point: string }[]
            ).map((sp) => sp.point);
            setSellingPoints(points);
          }
          if (heroTitleComponent.props.metrics) {
            setMetrics(heroTitleComponent.props.metrics as HeroMetric[]);
          }
        }
      } catch (error) {
        console.error("Failed to parse Puck data:", error);
      }
    }
  }, []);

  return (
    <Hero
      title={heroTitle}
      description={heroDescription}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      focusAreas={focusAreas}
      whyTitle={whyTitle}
      whySubtitle={whySubtitle}
      sellingPoints={sellingPoints}
      metrics={metrics}
    />
  );
};
