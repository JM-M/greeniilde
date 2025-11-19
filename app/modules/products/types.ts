export interface ProductIndexDocument {
  id: string;
  title: string;
  handle: string;
  status: string; // Use enum or string literal type
  description?: string;
  thumbnail?: string;
  total_available_inventory: number;
  categories?: { id: string; name: string }[];
  tags?: { id: string; value: string }[];
  variants?: {
    options: { name: string; value: string }[];
    prices: number[];
  }[];
  created_at?: string;
  min_price: number;
  max_price: number;
}

export interface MeilisearchHitsResponse {
  hits: ProductIndexDocument[];
  estimatedTotalHits: number;
  processingTimeMs: number;
  query: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  specs: string[];
  image: string;
}
