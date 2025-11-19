import { LandingView } from "@/app/modules/landing/ui/views/landing-view";
import { SearchParams } from "nuqs";
import { loadLandingProductsParams } from "./modules/landing/params";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const landingProductsParams = await loadLandingProductsParams(searchParams);

  return <LandingView landingProductsParams={landingProductsParams} />;
}
