import { Actions } from "./actions";
import { EditorStatus } from "./editor-status";
import { HistoryButtons } from "./history-buttons";
import { LayoutButtons } from "./layout-buttons";
import { PageDropdown } from "./page-dropdown";
import { PublishButton } from "./publish-button";

export const EditorHeader = ({
  onPublish,
  isPublishing,
  status,
  pageId,
  pagePath,
}: {
  onPublish: (data: any) => void;
  isPublishing: boolean;
  status: string;
  pageId: string;
  pagePath: string;
}) => {
  return (
    <div className="flex w-screen items-center justify-between border-b p-4">
      <HistoryButtons />
      <div className="mx-auto flex w-fit items-center gap-3">
        <PageDropdown />
      </div>
      <div className="flex w-fit items-center gap-3">
        <EditorStatus status={status} />
        <LayoutButtons />
        <PublishButton onPublish={onPublish} isPublishing={isPublishing} />
        <Actions pageId={pageId} pagePath={pagePath} />
      </div>
    </div>
  );
};
