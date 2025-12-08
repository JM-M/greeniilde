import { login, logout, register } from "@/app/lib/api/customer";
import { createMutationAction } from "@/app/lib/query/create-query";

export const authMutations = {
  login: createMutationAction(login, ["login"]),
  register: createMutationAction(register, ["register"]),
  logout: createMutationAction<void, void>(logout, ["logout"]),
};
