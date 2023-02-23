import React, { ReactElement, useLayoutEffect, useRef, useState } from "react";
import HierarchyTree from "./tree";
import { HierarchyItems } from "./types/HierarchyTypes";
import { HierarchyProps } from "./types/HierarchyProps";

interface FolderTempleteProps {
  content: string;
  isOpened?: boolean;
}

interface Props extends Partial<HierarchyProps> {
  data: HierarchyItems[];
  className?: string;
  onToggleFolder?: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string | number
  ) => void;
  onClickElement?: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string | number
  ) => void;
  folderTemplate?: (props: FolderTempleteProps) => ReactElement;
  elementTemplate?: (content: string) => ReactElement;
  folderClassName?: string;
  elementClassName?: string;
}

const Hierarchy = (props: Props) => {
  const {
    data,
    className,
    onToggleFolder,
    onClickElement,
    folderTemplate,
    elementTemplate,
    folderClassName,
    elementClassName,
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
          <HierarchyTree.Folder
            key={item.id}
            onClick={(e) => (onToggleFolder ? onToggleFolder(e, item.id) : {})}
            className={folderClassName}
          >
            {(isOpened) => {
              return [
                folderTemplate
                  ? folderTemplate({ content: item.content, isOpened })
                  : item.content,
                recursiveCreateTree(item.items as HierarchyItems[]),
              ];
            }}
          </HierarchyTree.Folder>
        );
      } else {
        newChildren.push(
          <HierarchyTree.Element
            key={item.id}
            onClick={(e) => (onClickElement ? onClickElement(e, item.id) : {})}
            className={elementClassName}
          >
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

  return (
    <HierarchyTree className={className} {...restProps}>
      {childrenRef.current}
    </HierarchyTree>
  );
};

export default Hierarchy;
