import { Meilisearch } from "meilisearch";
import "server-only";

export const meilisearch = new Meilisearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_API_KEY!,
});
