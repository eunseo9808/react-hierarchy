import React, { ReactElement, useLayoutEffect, useState } from "react";
import HierarchyTree from "./tree";
import { HierarchyElement, HierarchyItems } from "./types/HierarchyTypes";
import { HierarchyProps } from "./types/HierarchyProps";

interface Props extends Partial<HierarchyProps> {
  data: HierarchyItems[];
  onToggleElement: () => void;
  onClickElement: () => void;
}

const Hierarchy = (props: Props) => {
  const { data, onToggleElement, onClickElement, ...restProps } = props;
  const [children, setChildren] = useState<ReactElement[]>();

  const recursiveCreateTree = (
    items: HierarchyItems[]
  ): ReactElement[] | undefined => {
    const newChildren: ReactElement[] = [];
    if (items === undefined || items.length <= 0) return;

    items.forEach((item) => {
      if ("items" in item && item.items !== undefined) {
        newChildren.push(
          <HierarchyTree.Folder key={item.id} onClick={onToggleElement}>
            {item.content}
            {recursiveCreateTree(item.items)}
          </HierarchyTree.Folder>
        );
      } else {
        newChildren.push(
          <HierarchyTree.Element key={item.id} onClick={onClickElement}>
            {item.content}
          </HierarchyTree.Element>
        );
      }
    });

    return newChildren;
  };

  useLayoutEffect(() => {
    const newChildren = recursiveCreateTree(data);
    setChildren(newChildren);
  }, [data]);

  return <HierarchyTree {...restProps}>{children}</HierarchyTree>;
};

export default Hierarchy;
