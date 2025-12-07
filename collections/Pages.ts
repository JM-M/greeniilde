import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    description: "Manage content pages created with Puck editor",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Page Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier (e.g., 'home', 'about-us')",
      },
    },
    {
      name: "path",
      type: "text",
      label: "Page Path",
      required: true,
      unique: true,
      admin: {
        description:
          "Full URL path (e.g., '/about', '/case-studies/project-a')",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Page Title",
      required: true,
      admin: {
        description: "Display title for this page",
      },
    },
    {
      name: "type",
      type: "select",
      label: "Page Type",
      options: [
        { label: "Landing Page", value: "landing-page" },
        { label: "Case Study", value: "case-study" },
      ],
      defaultValue: "landing-page",
      required: true,
      admin: {
        description: "Type of page determines the editor configuration",
      },
    },
    {
      name: "puckData",
      type: "json",
      label: "Puck Editor Data",
      required: true,
      admin: {
        description: "JSON data from Puck visual editor",
      },
    },
  ],
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
};
