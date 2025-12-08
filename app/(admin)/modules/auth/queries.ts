import { getUser } from "@/app/(admin)/lib/api/auth";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

const getSuspenseUserQuery = createSuspenseQuery(getUser, ["auth", "getUser"]);
const getUserQuery = createQuery(getUser, ["auth", "getUser"]);

export const authQueries = {
  getSuspenseUser: getSuspenseUserQuery,
  getUser: getUserQuery,
} as const;
