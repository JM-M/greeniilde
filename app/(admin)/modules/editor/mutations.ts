import { savePageContent } from "@/app/(admin)/lib/api/editor";
import { createMutationAction } from "@/app/lib/query/create-query";

export const editorMutations = {
  savePageContent: createMutationAction(savePageContent, [
    "editor",
    "savePageContent",
  ]),
} as const;
