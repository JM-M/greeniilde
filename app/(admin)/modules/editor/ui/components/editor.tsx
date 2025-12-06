"use client";

import { Puck } from "@measured/puck";
import { useDebouncedCallback } from "use-debounce";
import { configs, ConfigType } from "../../configs";
import { useSavePageContent } from "../../hooks/use-editor-mutations";
import { useSuspenseGetPageContent } from "../../hooks/use-editor-queries";
import { EditableText } from "./editable-text";
import { EditorHeader } from "./editor-header";

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

  const configKey = (data.type as ConfigType) || "landing-page";
  const config = configs[configKey] || configs["landing-page"];

  console.log("configs: ", configs);
  console.log("config key: ", configKey);

  return (
    <Puck
      config={config}
      data={data.puckData}
      fieldTransforms={fieldTransforms}
      onPublish={handlePublish}
      onChange={handleAutoSave}
      overrides={{
        header: () => {
          return (
            <EditorHeader
              onPublish={handlePublish}
              isPublishing={savePageContentMutation.isPending}
            />
          );
        },
      }}
    />
  );
};
