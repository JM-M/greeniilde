// E-commerce disabled: simplified home page without product params
// Original code preserved as comments for re-enabling

import { LandingView } from "@/app/modules/landing/ui/views/landing-view";

// E-commerce imports - hidden
// import { SearchParams } from "nuqs";
// import { loadLandingProductsParams } from "../modules/landing/params";

// interface HomeProps {
//   searchParams: Promise<SearchParams>;
// }

// export default async function Home({ searchParams }: HomeProps) {
//   const landingProductsParams = await loadLandingProductsParams(searchParams);
//   return <LandingView landingProductsParams={landingProductsParams} />;
// }

export default async function Home() {
  return <LandingView />;
}
