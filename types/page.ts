export interface Page {
  id: string;
  slug: string;
  title: string;
  type: "landing-page" | "case-study";
  path: string;
  puckData: Record<string, any>;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
