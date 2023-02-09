import React, { ReactElement, useLayoutEffect, useState } from "react";
import HierarchyTree from "./tree";
import { Items } from "./types/items";

interface Props {
  data: Items[];
}

const Hierarchy = (props: Props) => {
  const { data } = props;
  const [children, setChildren] = useState<ReactElement[]>();

  const recursiveCreateTree = (items: Items[]): ReactElement[] | undefined => {
    const newChildren: ReactElement[] = [];
    if (items === undefined || items.length <= 0) return;

    items.forEach((item) => {
      if (item.items === undefined || item.items.length <= 0) {
        newChildren.push(
          <HierarchyTree.Element key={item.id}>
            {item.content}
          </HierarchyTree.Element>
        );
      } else {
        newChildren.push(
          <HierarchyTree.Folder key={item.id}>
            {item.content}
            {recursiveCreateTree(item.items)}
          </HierarchyTree.Folder>
        );
      }
    });

    return newChildren;
  };

  useLayoutEffect(() => {
    const newChildren = recursiveCreateTree(data);
    setChildren(newChildren);
  }, [data]);

  return <HierarchyTree>{children}</HierarchyTree>;
};

export default Hierarchy;
