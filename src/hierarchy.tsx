import React, { ReactElement, useLayoutEffect, useRef, useState } from "react";
import HierarchyTree from "./tree";
import { HierarchyItems } from "./types/HierarchyTypes";
import { HierarchyProps } from "./types/HierarchyProps";

interface Props extends Partial<HierarchyProps> {
  data: HierarchyItems[];
  onToggleElement?: () => void;
  onClickElement?: () => void;
  folderTemplate?: (content: string) => ReactElement;
  elementTemplate?: (content: string) => ReactElement;
}

const Hierarchy = (props: Props) => {
  const {
    data,
    onToggleElement,
    onClickElement,
    folderTemplate,
    elementTemplate,
    ...restProps
  } = props;
  const childrenRef = useRef<ReactElement[]>();
  const willUpdateRef = useRef<boolean>(false);
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const recursiveCreateTree = (
    items: HierarchyItems[]
  ): ReactElement[] | undefined => {
    const newChildren: ReactElement[] = [];
    if (items === undefined || items.length <= 0) return;

    items.forEach((item) => {
      if ("items" in item && item.items !== undefined) {
        newChildren.push(
          <HierarchyTree.Folder key={item.id} onClick={onToggleElement}>
            {folderTemplate ? folderTemplate(item.content) : item.content}
            {recursiveCreateTree(item.items)}
          </HierarchyTree.Folder>
        );
      } else {
        newChildren.push(
          <HierarchyTree.Element key={item.id} onClick={onClickElement}>
            {elementTemplate ? elementTemplate(item.content) : item.content}
          </HierarchyTree.Element>
        );
      }
    });

    return newChildren;
  };

  if (!willUpdateRef.current) {
    childrenRef.current = recursiveCreateTree(data);
  }

  willUpdateRef.current = true;

  useLayoutEffect(() => {
    willUpdateRef.current = false;
    forceUpdate();
  }, [data, forceUpdate]);

  return <HierarchyTree {...restProps}>{childrenRef.current}</HierarchyTree>;
};

export default Hierarchy;
