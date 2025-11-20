import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { getQueryClient } from "../lib/query/get-query-client";
import { cartQueries } from "../modules/cart/queries";
import { categoryQueries } from "../modules/categories";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  // TODO: Consider having a suspense boundary in here.

  // TODO: Create and use a server action (you may have to create a new route) that gets all categories (within a reasonable limit).
  queryClient.prefetchQuery(categoryQueries.listCategories.queryOptions({}));

  // Prefetch cart data for global cart state
  queryClient.prefetchQuery(cartQueries.retrieveCart.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
    </HydrationBoundary>
  );
};

export default PagesLayout;
