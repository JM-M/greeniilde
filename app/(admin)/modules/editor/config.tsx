import type { Config } from "@measured/puck";
import { CaseStudies } from "../../../modules/landing/ui/components/case-studies";
import { FAQs } from "../../../modules/landing/ui/components/faqs";
import { Hero } from "../../../modules/landing/ui/components/hero";
import { Process } from "../../../modules/landing/ui/components/process";
import { Products } from "../../../modules/landing/ui/components/products";
import { ValueProp } from "../../../modules/landing/ui/components/value-prop";

type FocusArea = {
  label: string;
  description: string;
};

type HeroMetric = {
  label: string;
  value: string;
};

type ValuePropStat = {
  label: string;
  value: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  HeroTitle: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    focusAreas: FocusArea[];
    whyTitle: string;
    whySubtitle: string;
    sellingPoints: { point: string }[];
    metrics: HeroMetric[];
  };
  ValuePropSection: {
    title: string;
    subtitle: string;
    features: { feature: string }[];
    buttonText: string;
    stats: ValuePropStat[];
    ctaText: string;
    videoSrc: string;
  };
  ProcessSection: {
    sectionTitle: string;
    sectionDescription: string;
    steps: ProcessStep[];
    ctaText: string;
  };
  CaseStudiesSection: {};
  ProductsSection: {};
  FAQsSection: {
    sectionTitle: string;
    faqs: FAQItem[];
    ctaText: string;
  };
};

export const config: Config<Props> = {
  components: {
    HeroTitle: {
      fields: {
        title: {
          type: "text",
          label: "Hero Title",
        },
        description: {
          type: "textarea",
          label: "Hero Description",
        },
        primaryCta: {
          type: "text",
          label: "Primary Button Text",
        },
        secondaryCta: {
          type: "text",
          label: "Secondary Button Text",
        },
        focusAreas: {
          type: "array",
          label: "Solutions We Specialize In",
          arrayFields: {
            label: {
              type: "text",
              label: "Solution Name",
            },
            description: {
              type: "text",
              label: "Solution Description",
            },
          },
        },
        whyTitle: {
          type: "text",
          label: "Why Greeniilde - Title",
        },
        whySubtitle: {
          type: "textarea",
          label: "Why Greeniilde - Subtitle",
        },
        sellingPoints: {
          type: "array",
          label: "Why Greeniilde - Selling Points",
          arrayFields: {
            point: {
              type: "text",
            },
          },
        },
        metrics: {
          type: "array",
          label: "Why Greeniilde - Metrics",
          arrayFields: {
            label: {
              type: "text",
              label: "Metric Label",
            },
            value: {
              type: "text",
              label: "Metric Value",
            },
          },
        },
      },
      render: ({
        title,
        description,
        primaryCta,
        secondaryCta,
        focusAreas,
        whyTitle,
        whySubtitle,
        sellingPoints,
        metrics,
      }) => (
        <Hero
          title={title}
          description={description}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          focusAreas={focusAreas}
          whyTitle={whyTitle}
          whySubtitle={whySubtitle}
          sellingPoints={sellingPoints?.map((sp) => sp.point) || []}
          metrics={metrics}
        />
      ),
    },
    ValuePropSection: {
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        subtitle: {
          type: "textarea",
          label: "Subtitle",
        },
        features: {
          type: "array",
          label: "Features",
          arrayFields: {
            feature: {
              type: "text",
            },
          },
        },
        buttonText: {
          type: "text",
          label: "Learn More Button",
        },
        stats: {
          type: "array",
          label: "Statistics",
          arrayFields: {
            label: {
              type: "text",
              label: "Stat Label",
            },
            value: {
              type: "text",
              label: "Stat Value",
            },
          },
        },
        ctaText: {
          type: "text",
          label: "Bottom CTA Text",
        },
        videoSrc: {
          type: "text",
          label: "Video Source URL",
        },
      },
      render: ({
        title,
        subtitle,
        features,
        buttonText,
        stats,
        ctaText,
        videoSrc,
      }) => (
        <ValueProp
          title={title}
          subtitle={subtitle}
          features={features?.map((f) => f.feature) || []}
          buttonText={buttonText}
          stats={stats}
          ctaText={ctaText}
          videoSrc={videoSrc}
        />
      ),
    },
    ProcessSection: {
      fields: {
        sectionTitle: {
          type: "text",
          label: "Section Title",
        },
        sectionDescription: {
          type: "text",
          label: "Section Description",
        },
        steps: {
          type: "array",
          label: "Process Steps",
          arrayFields: {
            title: {
              type: "text",
              label: "Step Title",
            },
            description: {
              type: "textarea",
              label: "Step Description",
            },
          },
        },
        ctaText: {
          type: "text",
          label: "CTA Button Text",
        },
      },
      render: ({ sectionTitle, sectionDescription, steps, ctaText }) => (
        <Process
          sectionTitle={sectionTitle}
          sectionDescription={sectionDescription}
          steps={steps}
          ctaText={ctaText}
        />
      ),
    },
    FAQsSection: {
      fields: {
        sectionTitle: {
          type: "text",
          label: "Section Title",
        },
        faqs: {
          type: "array",
          label: "FAQ Items",
          arrayFields: {
            question: {
              type: "text",
              label: "Question",
            },
            answer: {
              type: "textarea",
              label: "Answer",
            },
          },
        },
        ctaText: {
          type: "text",
          label: "CTA Button Text",
        },
      },
      render: ({ sectionTitle, faqs, ctaText }) => (
        <FAQs sectionTitle={sectionTitle} faqs={faqs} ctaText={ctaText} />
      ),
    },
    CaseStudiesSection: {
      fields: {},
      render: () => <CaseStudies />,
    },
    ProductsSection: {
      fields: {},
      render: () => <Products />,
    },
  },
};

export default config;
