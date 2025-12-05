import { createMutationAction } from "@/app/lib/query/create-query";
import { login } from "../../lib/api/auth";

export const authMutations = {
  login: createMutationAction(login, ["login"]),
};
