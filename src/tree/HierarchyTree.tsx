import React, { ReactNode, useEffect, useRef } from "react";
import { HierarchyContextProvider } from "../context/HierarchyContext";
import HierarchyTreeFolder from "./HierarchyTreeFolder";
import HierarchyTreeElement from "./HierarchyTreeElement";
import styles from "./styles.module.scss";
import cx from "classnames";
import { HierarchyProps } from "../types/HierarchyProps";

interface Props extends Partial<HierarchyProps> {
  children?: ReactNode;
  className?: string;
}

type HierarchyTreeType = React.FC<Props> & {
  Folder: typeof HierarchyTreeFolder;
  Element: typeof HierarchyTreeElement;
};

const HierarchyTree: HierarchyTreeType = (props: Props) => {
  const { children, className = "", ...restProps } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  const recursiveSetTranslateY = (
    element: HTMLElement,
    prevTranslateY: number
  ): number => {
    const treeType = element.getAttribute("tree-type");

    element.style.transform = `translateY(${prevTranslateY}px)`;

    if (
      treeType === "folder" ||
      treeType === "root" ||
      treeType === "folder-children"
    ) {
      if (
        treeType === "folder-children" &&
        element.getAttribute("tree-open") === "false"
      ) {
        for (const child of element.children) {
          recursiveSetTranslateY(child as HTMLElement, -child.scrollHeight);
        }

        element.style.height = "0px";
        return prevTranslateY;
      }

      let translateY = 0;

      for (const child of element.children) {
        translateY = recursiveSetTranslateY(child as HTMLElement, translateY);
      }

      return prevTranslateY + translateY;
    }

    return prevTranslateY + element.scrollHeight;
  };

  useEffect(() => {
    if (!rootRef.current) return;
    recursiveSetTranslateY(rootRef.current, 0);
  }, []);

  return (
    <HierarchyContextProvider {...restProps}>
      <div
        className={cx(styles.tree, {
          [className]: className,
        })}
        tree-type="root"
        ref={rootRef}
      >
        {children}
      </div>
    </HierarchyContextProvider>
  );
};

HierarchyTree.Folder = HierarchyTreeFolder;
HierarchyTree.Element = HierarchyTreeElement;

export default HierarchyTree;
