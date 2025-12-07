"use client";

import { Button } from "@/app/components/ui/button";
import { createUsePuck } from "@measured/puck";
import {
  // VscLayoutSidebarLeft,
  // VscLayoutSidebarLeftOff,
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";

// Create usePuck with selector support
const usePuck = createUsePuck();

export const LayoutButtons = () => {
  // Use selectors to only subscribe to specific values
  const rightSideBarVisible = usePuck((s) => s.appState.ui.rightSideBarVisible);
  const dispatch = usePuck((s) => s.dispatch);

  // const toggleLeft = () => {
  //   dispatch({
  //     type: "setUi",
  //     ui: { leftSideBarVisible: !leftSideBarVisible },
  //   });
  // };

  const toggleRight = () => {
    dispatch({
      type: "setUi",
      ui: { rightSideBarVisible: !rightSideBarVisible },
    });
  };

  // let leftPanelIcon = <VscLayoutSidebarLeft className="size-5" />;
  let rightPanelIcon = <VscLayoutSidebarRight className="size-5" />;

  // if (!leftSideBarVisible) {
  //   leftPanelIcon = <VscLayoutSidebarLeftOff className="size-5" />;
  // }

  if (!rightSideBarVisible) {
    rightPanelIcon = <VscLayoutSidebarRightOff className="size-5" />;
  }

  return (
    <div className="flex items-center gap-1">
      {/* <Button variant="ghost" size="icon-sm" onClick={toggleLeft}>
        {leftPanelIcon}
      </Button> */}
      <Button variant="ghost" size="icon-sm" onClick={toggleRight}>
        {rightPanelIcon}
      </Button>
    </div>
  );
};
