"use client";

import { Puck } from "@measured/puck";
import { useDebouncedCallback } from "use-debounce";
import { configs, ConfigType } from "../../configs";
import { useSavePageContent } from "../../hooks/use-editor-mutations";
import { useSuspenseGetPageContent } from "../../hooks/use-editor-queries";
import { EditableText } from "./editable-text";
import { EditorHeader } from "./editor-header";
import { EditorHome } from "./editor-home";

const fieldTransforms = {
  text: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
  textarea: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
};

interface EditorProps {
  path?: string;
}

export const Editor = ({ path }: EditorProps) => {
  const { data } = useSuspenseGetPageContent(path || "");
  const savePageContentMutation = useSavePageContent();

  if (!path) {
    return <EditorHome />;
  }

  if (!data) {
    return "Unable to fetch page data";
  }

  const handlePublish = (puckData: any) => {
    savePageContentMutation.mutate({
      slug: data.slug,
      title: data.title,
      path: data.path || path,
      puckData,
      action: "publish",
    });
  };

  const handleAutoSave = useDebouncedCallback((puckData: any) => {
    console.log("saving...");
    savePageContentMutation.mutate({
      slug: data.slug,
      title: data.title,
      path: data.path || path, // Use path from data or fallback to search param
      puckData,
      action: "draft",
    });
  }, 1000);

  const configKey = data.type as ConfigType;
  const config = configs[configKey];

  const getStatus = () => {
    if (
      savePageContentMutation.isPending &&
      savePageContentMutation.variables?.action === "publish"
    ) {
      return "Publishing...";
    }

    if (
      savePageContentMutation.isPending &&
      savePageContentMutation.variables?.action === "draft"
    ) {
      return "Saving draft...";
    }

    if (data._status === "published") {
      return "Published";
    }

    return "Draft saved";
  };

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
              status={getStatus()}
              pageId={String(data.id)}
              pagePath={data.path}
              isPublishing={
                savePageContentMutation.isPending &&
                savePageContentMutation.variables?.action === "publish"
              }
            />
          );
        },
      }}
    />
  );
};
