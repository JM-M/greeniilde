import { retrieveCustomer } from "@/app/lib/api/customer";
import { createSuspenseQuery } from "@/app/lib/query/create-query";

const retrieveCustomerQuery = createSuspenseQuery(retrieveCustomer, [
  "customer",
  "retrieveCustomer",
]);

export const authQueries = {
  retrieveCustomer: retrieveCustomerQuery,
} as const;
