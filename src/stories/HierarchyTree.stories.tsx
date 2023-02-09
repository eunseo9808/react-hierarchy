import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import React from "react";

import HierarchyTree from "./HierarchyTree";

storiesOf("Hierarchy", module).add("Tree", () => {
  return (
    <HierarchyTree>
      <HierarchyTree.Folder>
        <div>Folder1</div>
        <HierarchyTree.Element>Element1</HierarchyTree.Element>
        <HierarchyTree.Folder>
          Folder2
          <HierarchyTree.Element>Element2</HierarchyTree.Element>
        </HierarchyTree.Folder>
        <HierarchyTree.Element>Element3</HierarchyTree.Element>
        <HierarchyTree.Folder>
          Folder3
          <HierarchyTree.Element>Element4</HierarchyTree.Element>
        </HierarchyTree.Folder>
      </HierarchyTree.Folder>
    </HierarchyTree>
  );
});
