import React, { HTMLAttributes, ReactNode } from "react";
import { HierarchyContextProvider } from "./HierarchyContext";
import HierarchyTreeFolder from "./HierarchyTreeFolder";
import HierarchyTreeElement from "./HierarchyTreeElement";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  defaultIsFold?: boolean;
}

type HierarchyTreeType = React.FC<Props> & {
  Folder: typeof HierarchyTreeFolder;
  Element: typeof HierarchyTreeElement;
};

const HierarchyTree: HierarchyTreeType = (props: Props) => {
  const { children, defaultIsFold = true, ...restProps } = props;
  return (
    <HierarchyContextProvider defaultIsFold={defaultIsFold}>
      <div {...restProps}>{children}</div>
    </HierarchyContextProvider>
  );
};

HierarchyTree.Folder = HierarchyTreeFolder;
HierarchyTree.Element = HierarchyTreeElement;

export default HierarchyTree;
