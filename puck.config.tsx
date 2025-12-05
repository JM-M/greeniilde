import type { Config } from "@measured/puck";
import { Hero } from "./app/modules/landing/ui/components/hero";
import { ValueProp } from "./app/modules/landing/ui/components/value-prop";
import { Process } from "./app/modules/landing/ui/components/process";
import { FAQs } from "./app/modules/landing/ui/components/faqs";
import { CaseStudies } from "./app/modules/landing/ui/components/case-studies";
import { Products } from "./app/modules/landing/ui/components/products";

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
  }
;
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
      defaultProps: {
        title: "Save on electricity with reliable, maintenance-free solar power.",
        description:
          "We design, supply, and install turnkey residential and commercial solar systems across Nigeria—built for uptime, backed by proactive monitoring, and tailored to your energy profile.",
        primaryCta: "Book a project consult",
        secondaryCta: "Get in touch",
        focusAreas: [
          {
            label: "Panels",
            description:
              "Premium mono & bifacial modules engineered for African sun.",
          },
          {
            label: "Inverters",
            description: "Hybrid-ready systems with remote diagnostics baked in.",
          },
          {
            label: "Storage",
            description: "Lithium battery banks sized for homes, farms, and SMEs.",
          },
          {
            label: "Solar Pumps",
            description: "Efficient irrigation kits for boreholes and reservoirs.",
          },
        ],
        whyTitle: "Engineered systems with proactive monitoring baked in.",
        whySubtitle:
          "Our in-house team guides permits, installs, and post-install maintenance so you stay online even through extended load-shedding.",
        sellingPoints: [
          { point: "Detailed consumption modelling & shading analysis" },
          { point: "Tier-1 hardware plus 25-year performance warranties" },
          { point: "Remote diagnostics and quarterly performance reports" },
        ],
        metrics: [
          { label: "Installations delivered", value: "450+" },
          { label: "Average payback", value: "3.8 yrs" },
          { label: "System uptime", value: "99.2%" },
          { label: "Customer NPS", value: "74" },
        ],
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
      defaultProps: {
        title: "Go Solar. Save Big. Live Green.",
        subtitle:
          "Smart energy solutions that save money and protect against rising costs.",
        features: [
          { feature: "High Efficiency Panels" },
          { feature: "Eco-Friendly Materials" },
          { feature: "25+ Years Confidence Warranty" },
          { feature: "Smart Monitoring App" },
          { feature: "Expert Installation" },
        ],
        buttonText: "Learn More",
        stats: [
          { label: "Production", value: "42.3 kWh" },
          { label: "Consumption", value: "36.8 kWh" },
          { label: "Battery", value: "72%" },
        ],
        ctaText: "Book a project consult",
        videoSrc: "/videos/installation.mp4",
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
      defaultProps: {
        sectionTitle: "Our Process",
        sectionDescription:
          "We follow a simple process to install your solar system.",
        steps: [
          {
            title: "Free Assessment",
            description:
              "We evaluate your energy needs, roof/ground conditions, and budget through a quick site visit or virtual consultation to recommend the right system.",
          },
          {
            title: "Custom Design",
            description:
              "Our engineers design a tailored solar system, selecting components for maximum efficiency and savings, and provide a clear proposal with an ROI estimate.",
          },
          {
            title: "Professional Installation",
            description:
              "Certified technicians handle mounting, wiring, safety checks, and grid connection while we take care of all permits and inspections.",
          },
          {
            title: "Monitoring & Maintenance",
            description:
              "We monitor system performance in real time and offer support and maintenance plans to keep your system running at peak efficiency.",
          },
        ],
        ctaText: "Book a project consult",
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
      defaultProps: {
        sectionTitle: "Frequently Asked Questions",
        faqs: [
          {
            question: "How soon can I get started?",
            answer:
              "We kick things off within a week after a quick discovery call and agreement on scope.",
          },
          {
            question: "Do you offer ongoing support?",
            answer:
              "Yes, we include a maintenance window and flexible retainers for continuous improvements.",
          },
          {
            question: "What industries do you specialize in?",
            answer:
              "We work across climate tech, circular logistics, and other sustainability-focused sectors.",
          },
        ],
        ctaText: "Book a project consult",
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
