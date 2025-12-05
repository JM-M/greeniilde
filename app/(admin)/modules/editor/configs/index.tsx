import { caseStudyConfig } from "./case-study";
import { landingPageConfig } from "./landing-page";

export const configs = {
  "landing-page": landingPageConfig,
  "case-study": caseStudyConfig,
};

export type ConfigType = keyof typeof configs;
