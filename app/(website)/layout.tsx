import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { DEFAULT_COUNTRY_CODE } from "../constants/terminal";
import { CartSheetProvider } from "../contexts/cart-sheet-context";
import { getQueryClient } from "../lib/query/get-query-client";
import { AuthModal } from "../modules/auth/components/auth-modal";
import { authQueries } from "../modules/auth/queries";
import { cartQueries } from "../modules/cart/queries";
import { categoryQueries } from "../modules/categories/queries";
import { terminalQueries } from "../modules/terminal/queries";
import { AuthModalProvider } from "../providers/auth-modal-provider";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  // TODO: Create and use a server action (you may have to create a new route) that gets all categories (within a reasonable limit).
  queryClient.prefetchQuery(categoryQueries.listCategories.queryOptions({}));

  // Prefetch cart data for global cart state
  queryClient.prefetchQuery(cartQueries.retrieveCart.queryOptions());

  // Prefetch customer data
  queryClient.prefetchQuery(authQueries.retrieveCustomer.queryOptions());

  queryClient.prefetchQuery(terminalQueries.getCountries.queryOptions());
  queryClient.prefetchQuery(
    terminalQueries.getCities.queryOptions({
      countryIsoCode: DEFAULT_COUNTRY_CODE,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthModalProvider>
        <CartSheetProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] pt-14">{children}</main>
          <Footer />
          <AuthModal />
        </CartSheetProvider>
      </AuthModalProvider>
    </HydrationBoundary>
  );
};

export default PagesLayout;
