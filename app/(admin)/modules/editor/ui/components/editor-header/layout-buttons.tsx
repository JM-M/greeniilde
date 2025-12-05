"use client";

import { Button } from "@/app/components/ui/button";
import { usePuck } from "@measured/puck";
import {
  VscLayoutSidebarLeft,
  VscLayoutSidebarLeftOff,
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";

export const LayoutButtons = () => {
  const { appState, dispatch } = usePuck();
  const { leftSideBarVisible, rightSideBarVisible } = appState.ui;

  const toggleLeft = () => {
    dispatch({
      type: "setUi",
      ui: { leftSideBarVisible: !leftSideBarVisible },
    });
  };

  const toggleRight = () => {
    dispatch({
      type: "setUi",
      ui: { rightSideBarVisible: !rightSideBarVisible },
    });
  };

  let leftPanelIcon = <VscLayoutSidebarLeft className="size-5" />;
  let rightPanelIcon = <VscLayoutSidebarRight className="size-5" />;

  if (!leftSideBarVisible) {
    leftPanelIcon = <VscLayoutSidebarLeftOff className="size-5" />;
  }

  if (!rightSideBarVisible) {
    rightPanelIcon = <VscLayoutSidebarRightOff className="size-5" />;
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon-sm" onClick={toggleLeft}>
        {leftPanelIcon}
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={toggleRight}>
        {rightPanelIcon}
      </Button>
    </div>
  );
};
