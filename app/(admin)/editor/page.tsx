import { EditorView } from "../modules/editor/ui/views/editor-view";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// TODO: Consider using a catch all dynamic page to handle all paths

export default async function EditorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return <EditorView searchParams={await searchParams} />;
}
