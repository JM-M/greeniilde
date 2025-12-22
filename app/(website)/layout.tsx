// E-commerce disabled: simplified layout without cart/auth providers
// Original imports preserved as comments for re-enabling

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { getQueryClient } from "../lib/query/get-query-client";

// E-commerce imports - hidden
// import { DEFAULT_COUNTRY_CODE } from "../constants/terminal";
// import { CartSheetProvider } from "../contexts/cart-sheet-context";
// import { AuthModal } from "../modules/auth/components/auth-modal";
// import { authQueries } from "../modules/auth/queries";
// import { cartQueries } from "../modules/cart/queries";
// import { categoryQueries } from "../modules/categories/queries";
// import { terminalQueries } from "../modules/terminal/queries";
// import { AuthModalProvider } from "../providers/auth-modal-provider";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  // E-commerce prefetching - hidden
  // queryClient.prefetchQuery(categoryQueries.listCategories.queryOptions({}));
  // queryClient.prefetchQuery(cartQueries.retrieveCart.queryOptions());
  // queryClient.prefetchQuery(authQueries.retrieveCustomer.queryOptions());
  // queryClient.prefetchQuery(terminalQueries.getCountries.queryOptions());
  // queryClient.prefetchQuery(
  //   terminalQueries.getCities.queryOptions({
  //     countryIsoCode: DEFAULT_COUNTRY_CODE,
  //   }),
  // );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* E-commerce providers hidden
      <AuthModalProvider>
        <CartSheetProvider>
      */}
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] pt-14">{children}</main>
      <Footer />
      {/* E-commerce providers hidden
          <AuthModal />
        </CartSheetProvider>
      </AuthModalProvider>
      */}
    </HydrationBoundary>
  );
};

export default PagesLayout;
