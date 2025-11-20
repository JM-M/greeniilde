import { Meilisearch } from "meilisearch";
import "server-only";

import { generateMeilisearchToken } from "../api/meilisearch";

export const getMeilisearchClient = async () => {
  const { token } = await generateMeilisearchToken();

  console.log("meilisearch token: ", token);

  return new Meilisearch({
    host: process.env.MEILISEARCH_HOST!,
    apiKey: token,
  });
};
