import { Meilisearch } from "meilisearch";
import "server-only";

import { generateMeilisearchToken } from "../api/meilisearch";

export const getMeilisearchClient = async () => {
  const { token } = await generateMeilisearchToken();
  // console.log(token);

  return new Meilisearch({
    host: process.env.MEILISEARCH_HOST!,
    // apiKey: process.env.MEILISEARCH_API_KEY!,
    apiKey: token,
  });
};

export const getMeilisearchMasterClient = () => {
  return new Meilisearch({
    host: process.env.MEILISEARCH_HOST!,
    apiKey: process.env.MEILISEARCH_API_KEY!,
  });
};
