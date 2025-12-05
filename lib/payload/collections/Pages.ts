import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    // MVP: Allow all operations
    // Later: Add role-based permissions
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Page Title",
      required: true,
      admin: {
        description: "Internal page name (e.g., 'Landing Page')",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL path (e.g., '/' or '/about')",
      },
      validate: (value: string | null | undefined) => {
        if (!value || typeof value !== "string") {
          return "Slug must be a string";
        }
        if (!value.startsWith("/")) {
          return "Slug must start with /";
        }
        return true;
      },
    },
    {
      name: "puckData",
      type: "json",
      label: "Puck Editor Data",
      required: true,
      admin: {
        description: "Structured JSON data from Puck editor",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Published At",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-set publishedAt when status changes to published
        if (data.status === "published" && operation === "update") {
          if (!data.publishedAt) {
            data.publishedAt = new Date().toISOString();
          }
        }
        return data;
      },
    ],
  },
  versions: {
    drafts: true, // Enable draft versions
    maxPerDoc: 10, // Keep last 10 versions
  },
};
