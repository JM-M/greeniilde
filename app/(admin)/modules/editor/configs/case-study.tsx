import {
  CaseStudyContentSection,
  CaseStudyHeaderSection,
  CaseStudyHeroSection,
  CaseStudyRelatedSection,
} from "@/app/modules/case-studies/ui/components/sections/details-view";
import type { Config, CustomField } from "@measured/puck";
import { EditorImage } from "../ui/components/editor-image";

// Type for image array items
type ImageItem = { url: string };
// Type for technology array items
type TechnologyItem = { name: string };

type Props = {
  CaseStudyHeaderSection: {
    name: string;
    location: string;
    date: string;
    type: "Residential" | "Commercial";
  };
  CaseStudyHeroSection: {
    images: string[];
    location: string;
    projectType: string;
    dateCompleted: string;
    technologies: string[];
  };
  CaseStudyContentSection: {
    overview: string;
  };
  CaseStudyRelatedSection: {
    currentId: string;
  };
};

export const caseStudyConfig: Config<Props> = {
  components: {
    CaseStudyHeaderSection: {
      fields: {
        name: { type: "text", label: "Case Study Name" },
        location: { type: "text", label: "Location" },
        date: { type: "text", label: "Date Completed" },
        type: {
          type: "select",
          label: "Project Type",
          options: [
            { label: "Residential", value: "Residential" },
            { label: "Commercial", value: "Commercial" },
          ],
        },
      },
      defaultProps: {
        name: "New Case Study",
        location: "Lagos, Nigeria",
        date: "2024",
        type: "Residential",
      },
      render: (props) => <CaseStudyHeaderSection {...props} />,
    },

    CaseStudyHeroSection: {
      fields: {
        images: {
          type: "array",
          label: "Gallery Images",
          arrayFields: {
            url: {
              type: "custom",
              label: "Image",
              render: ({
                name,
                onChange,
                value,
                field,
              }: {
                name: string;
                onChange: (value: string) => void;
                value: string;
                field: CustomField<string>;
              }) => (
                <EditorImage
                  field={{ label: field.label || name }}
                  value={value}
                  onChange={(val) => onChange(val || "")}
                />
              ),
            },
          },
          getItemSummary: (item: ImageItem, index?: number) =>
            item?.url
              ? `Image ${(index ?? 0) + 1}`
              : `Empty ${(index ?? 0) + 1}`,
        },
        location: { type: "text", label: "Location" },
        projectType: {
          type: "select",
          label: "Project Type",
          options: [
            { label: "Residential", value: "Residential" },
            { label: "Commercial", value: "Commercial" },
          ],
        },
        dateCompleted: { type: "text", label: "Date Completed" },
        technologies: {
          type: "array",
          label: "Technologies Used",
          arrayFields: {
            name: { type: "text", label: "Technology Name" },
          },
          getItemSummary: (item: TechnologyItem) => item?.name || "Unnamed",
        },
      },
      defaultProps: {
        images: [],
        location: "Lagos, Nigeria",
        projectType: "Residential",
        dateCompleted: "2024",
        technologies: [],
      },
      render: ({
        images,
        location,
        projectType,
        dateCompleted,
        technologies,
      }) => {
        // Transform array items to the expected format
        const imageUrls =
          (images as any[])?.map((img) => img?.url).filter(Boolean) || [];
        const techNames =
          (technologies as any[])?.map((t) => t?.name).filter(Boolean) || [];

        return (
          <CaseStudyHeroSection
            images={imageUrls}
            location={location}
            projectType={projectType}
            dateCompleted={dateCompleted}
            technologies={techNames}
          />
        );
      },
    },

    CaseStudyContentSection: {
      fields: {
        overview: { type: "textarea", label: "Overview Text" },
      },
      defaultProps: {
        overview:
          "This project showcases our expertise in delivering high-quality solar installations. The system was designed to meet the specific energy needs of the property while maximizing efficiency and long-term savings.",
      },
      render: (props) => <CaseStudyContentSection {...props} />,
    },

    CaseStudyRelatedSection: {
      fields: {
        currentId: {
          type: "text",
          label: "Current Case Study ID (for exclusion)",
        },
      },
      defaultProps: {
        currentId: "",
      },
      render: (props) => <CaseStudyRelatedSection {...props} />,
    },
  },
};
