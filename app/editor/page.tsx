"use client";

import {
  getPageContent,
  savePageContent,
} from "@/app/lib/actions/content-pages";
import type { Data } from "@measured/puck";
import { Puck, registerOverlayPortal } from "@measured/puck";
import "@measured/puck/puck.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { config } from "../../puck.config";

// Inline editable text component - edits on canvas sync to Puck state
const InlineEditableText = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Register the element as an overlay portal so it can be interacted with
      registerOverlayPortal(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        // Update Puck state when user finishes editing (onBlur)
        onChange(e.currentTarget.textContent || "");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      style={{
        outline: "2px dashed rgba(99, 102, 241, 0.5)",
        outlineOffset: "4px",
        cursor: "text",
        minHeight: "1em",
      }}
    >
      {value}
    </div>
  );
};

// Field transforms for inline editing
const fieldTransforms = {
  text: ({ value, onChange }: any) => (
    <InlineEditableText value={value} onChange={onChange} />
  ),
  textarea: ({ value, onChange }: any) => (
    <InlineEditableText value={value} onChange={onChange} />
  ),
};

export default function EditorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<Data>({
    content: [
      {
        type: "HeroTitle",
        props: {
          id: "HeroTitle-1",
          title:
            "Save on electricity with reliable, maintenance-free solar power.",
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
              description:
                "Hybrid-ready systems with remote diagnostics baked in.",
            },
            {
              label: "Storage",
              description:
                "Lithium battery banks sized for homes, farms, and SMEs.",
            },
            {
              label: "Solar Pumps",
              description:
                "Efficient irrigation kits for boreholes and reservoirs.",
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
      },
      {
        type: "ValuePropSection",
        props: {
          id: "ValuePropSection-1",
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
      },
      {
        type: "CaseStudiesSection",
        props: {
          id: "CaseStudiesSection-1",
        },
      },
      {
        type: "ProductsSection",
        props: {
          id: "ProductsSection-1",
        },
      },
      {
        type: "ProcessSection",
        props: {
          id: "ProcessSection-1",
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
      },
      {
        type: "FAQsSection",
        props: {
          id: "FAQsSection-1",
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
      },
    ],
    root: {},
  });

  // Load data from backend on mount
  useEffect(() => {
    async function loadPageData() {
      try {
        const pageData = await getPageContent("home");
        if (pageData && pageData.puckData) {
          setData(pageData.puckData);
        }
      } catch (error) {
        console.error("Failed to load page data:", error);
        // Keep default data if fetch fails
      } finally {
        setIsLoading(false);
      }
    }
    loadPageData();
  }, []);

  const handlePublish = async (data: Data) => {
    setIsSaving(true);
    try {
      await savePageContent("home", "Home Page", data, "published");
      alert("Published successfully!");
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to publish. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <Puck
      config={config}
      data={data}
      fieldTransforms={fieldTransforms}
      onPublish={handlePublish}
    />
  );
}
