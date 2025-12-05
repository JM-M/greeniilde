"use client";

import { Puck } from "@measured/puck";
import { useDebouncedCallback } from "use-debounce";
import config from "../../config";
import { useSavePageContent } from "../../hooks/use-editor-mutations";
import { useSuspenseGetPageContent } from "../../hooks/use-editor-queries";
import { EditableText } from "./editable-text";

const fieldTransforms = {
  text: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
  textarea: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
};

export const Editor = () => {
  const { data } = useSuspenseGetPageContent("home");
  const savePageContentMutation = useSavePageContent();

  const handlePublish = (puckData: any) => {
    // savePageContentMutation.mutate({
    //   slug: "home",
    //   title: "Home Page",
    //   puckData,
    //   status: "published",
    // });
  };

  const handleAutoSave = useDebouncedCallback((puckData: any) => {
    console.log("saving...");
    // Saving as draft seems to fuck things up
    savePageContentMutation.mutate({
      slug: "home",
      title: "Home Page",
      puckData,
      status: "published",
    });
  }, 1000);

  return (
    <Puck
      config={config}
      data={data.puckData}
      fieldTransforms={fieldTransforms}
      onPublish={handlePublish}
      onChange={handleAutoSave}
    />
  );
};
