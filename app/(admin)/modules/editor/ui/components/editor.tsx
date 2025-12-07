"use client";

import { createUsePuck, Puck } from "@measured/puck";
import { useDebouncedCallback } from "use-debounce";
import { configs, ConfigType } from "../../configs";
import { useSavePageContent } from "../../hooks/use-editor-mutations";
import { useSuspenseGetPageContent } from "../../hooks/use-editor-queries";
import { EditableText } from "./editable-text";
import { EditorHeader } from "./editor-header";
import { EditorHome } from "./editor-home";
import { InlineEditorProvider } from "./inline-editor-context";
import { SidebarFieldWrapper } from "./sidebar-field-wrapper";

const fieldTransforms = {
  text: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
  textarea: ({ value, propName, componentId }: any) => (
    <EditableText value={value} propName={propName} componentId={componentId} />
  ),
};

// Create a typed usePuck with selector support for better performance
const usePuck = createUsePuck();

// Field wrapper component that reads componentId from Puck context
const FieldTypeWrapper = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  // Use selector to only re-render when selectedItem changes
  const componentId = usePuck(
    (s) => s.selectedItem?.props?.id as string | undefined,
  );

  if (!componentId) {
    return <>{children}</>;
  }

  return (
    <SidebarFieldWrapper componentId={componentId} propName={name}>
      {children}
    </SidebarFieldWrapper>
  );
};

interface EditorProps {
  path?: string;
}

// Main Editor component - handles the path check before any data fetching
export const Editor = ({ path }: EditorProps) => {
  // If no path, show the home view without fetching page data
  if (!path) {
    return <EditorHome />;
  }

  // When we have a path, render the data-fetching editor
  return <EditorWithData path={path} />;
};

// Inner component that fetches data - only rendered when path is defined
const EditorWithData = ({ path }: { path: string }) => {
  const { data } = useSuspenseGetPageContent(path);
  const savePageContentMutation = useSavePageContent();

  if (!data) {
    return "Unable to fetch page data";
  }

  const handlePublish = (puckData: any) => {
    savePageContentMutation.mutate({
      slug: data.slug,
      title: data.title,
      type: data.type,
      path: data.path || path,
      puckData,
      action: "publish",
    });
  };

  const handleAutoSave = useDebouncedCallback((puckData: any) => {
    savePageContentMutation.mutate({
      slug: data.slug,
      title: data.title,
      type: data.type,
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
    <InlineEditorProvider>
      <Puck
        config={config}
        data={data.puckData}
        fieldTransforms={fieldTransforms}
        onPublish={handlePublish}
        onChange={handleAutoSave}
        ui={{ leftSideBarVisible: false }}
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
                isDraft={data._status === "draft"}
              />
            );
          },
          fieldTypes: {
            text: ({ children, name }) => (
              <FieldTypeWrapper name={name}>{children}</FieldTypeWrapper>
            ),
            textarea: ({ children, name }) => (
              <FieldTypeWrapper name={name}>{children}</FieldTypeWrapper>
            ),
          },
        }}
      />
    </InlineEditorProvider>
  );
};
