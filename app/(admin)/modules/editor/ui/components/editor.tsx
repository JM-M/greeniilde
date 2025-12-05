"use client";

import { Puck } from "@measured/puck";
import config from "../../config";
import { useSuspenseGetPageContent } from "../../hooks/use-editor-queries";
import { EditableText } from "./editable-text";

const fieldTransforms = {
  text: ({ value, onChange }: any) => (
    <EditableText value={value} onChange={onChange} />
  ),
  textarea: ({ value, onChange }: any) => (
    <EditableText value={value} onChange={onChange} />
  ),
};

export const Editor = () => {
  const { data } = useSuspenseGetPageContent("home");
  console.log(data);

  const handlePublish = (data: any) => {
    console.log(data);
  };

  return (
    <Puck
      config={config}
      data={data.puckData}
      fieldTransforms={fieldTransforms}
      onPublish={handlePublish}
    />
  );
};
