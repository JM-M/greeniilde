"use client";

import { getPageContent } from "@/app/lib/actions/content-pages";
import { useEffect, useState } from "react";
import { Hero } from "../components/hero";

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
    async function loadHeroData() {
      try {
        const pageData = await getPageContent("home");
        console.log("page data: ", pageData);

        if (pageData && pageData.puckData) {
          const data = pageData.puckData;
          // Find the HeroTitle component in the content
          const heroTitleComponent = data.content?.find(
            (item: any) => item.type === "HeroTitle",
          );
          if (heroTitleComponent?.props) {
            if (heroTitleComponent.props.title) {
              setHeroTitle(heroTitleComponent.props.title as string);
            }
            if (heroTitleComponent.props.description) {
              setHeroDescription(
                heroTitleComponent.props.description as string,
              );
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
        }
      } catch (error) {
        console.error("Failed to load hero data from backend:", error);
        // Component will use default props if this fails
      }
    }
    loadHeroData();
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
