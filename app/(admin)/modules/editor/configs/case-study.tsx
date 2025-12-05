import { Config } from "@measured/puck";

type Props = {
  CaseStudyHeader: {
    title: string;
    location: string;
    date: string;
    type: "Residential" | "Commercial";
  };
  CaseStudyGallery: {
    images: { url: string }[];
  };
  ProjectDetails: {
    technologies: { name: string }[];
    systemSize: string;
    batterySize: string;
  };
  Overview: {
    content: string;
  };
};

export const caseStudyConfig: Config<Props> = {
  components: {
    CaseStudyHeader: {
      fields: {
        title: { type: "text" },
        location: { type: "text" },
        date: { type: "text" },
        type: {
          type: "select",
          options: [
            { label: "Residential", value: "Residential" },
            { label: "Commercial", value: "Commercial" },
          ],
        },
      },
      defaultProps: {
        title: "New Case Study",
        location: "Lagos, Nigeria",
        date: "2024",
        type: "Residential",
      },
      render: ({ title, location, date, type }) => (
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">
            {location} • {date} • {type}
          </p>
        </div>
      ),
    },
    CaseStudyGallery: {
      fields: {
        images: {
          type: "array",
          arrayFields: {
            url: { type: "text" },
          },
        },
      },
      defaultProps: {
        images: [{ url: "/images/placeholder.jpg" }],
      },
      render: ({ images }) => (
        <div className="grid grid-cols-3 gap-4 p-4">
          {images?.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`Gallery ${i}`}
              className="h-32 w-full rounded object-cover"
            />
          ))}
        </div>
      ),
    },
    ProjectDetails: {
      fields: {
        technologies: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
          },
        },
        systemSize: { type: "text" },
        batterySize: { type: "text" },
      },
      defaultProps: {
        technologies: [{ name: "Solar Panels" }, { name: "Inverter" }],
        systemSize: "10kVA",
        batterySize: "15kWh",
      },
      render: ({ technologies, systemSize, batterySize }) => (
        <div className="bg-gray-50 p-4">
          <h3 className="mb-2 font-bold">Project Details</h3>
          <ul className="list-disc pl-5">
            <li>System Size: {systemSize}</li>
            <li>Battery Size: {batterySize}</li>
            <li>Technologies: {technologies?.map((t) => t.name).join(", ")}</li>
          </ul>
        </div>
      ),
    },
    Overview: {
      fields: {
        content: { type: "textarea" },
      },
      defaultProps: {
        content: "Project overview goes here...",
      },
      render: ({ content }) => <div className="p-4">{content}</div>,
    },
  },
};
