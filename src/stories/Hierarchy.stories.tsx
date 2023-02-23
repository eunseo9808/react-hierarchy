import { storiesOf } from "@storybook/react";
import React from "react";
import { items } from "./data/items";

import Hierarchy, { FolderTempleteProps } from "../hierarchy";

const folderTemplate = ({ content, isOpened }: FolderTempleteProps) => {
  return (
    <div>
      {isOpened ? "open" : "close"} {content}
    </div>
  );
};

storiesOf("Hierarchy", module).add("Tree", () => {
  return <Hierarchy data={items} folderTemplate={folderTemplate} />;
});
