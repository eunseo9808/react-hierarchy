import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { HierarchyContextProvider } from "../context/HierarchyContext";
import HierarchyTreeFolder from "./HierarchyTreeFolder";
import HierarchyTreeElement from "./HierarchyTreeElement";
import styles from "./styles.module.scss";
import cx from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  defaultIsFold?: boolean;
  depthInLength?: number;
}

type HierarchyTreeType = React.FC<Props> & {
  Folder: typeof HierarchyTreeFolder;
  Element: typeof HierarchyTreeElement;
};

const HierarchyTree: HierarchyTreeType = (props: Props) => {
  const {
    children,
    className = "",
    defaultIsFold = true,
    depthInLength = 20,
    ...restProps
  } = props;
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
      let translateY = 0;

      for (const child of element.children) {
        translateY = recursiveSetTranslateY(child as HTMLElement, translateY);
      }

      if (
        treeType === "folder-children" &&
        element.getAttribute("tree-open") === "false"
      ) {
        element.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
        return prevTranslateY;
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
    <HierarchyContextProvider
      defaultIsFold={defaultIsFold}
      depthInLength={depthInLength}
    >
      <div
        className={cx(styles.tree, {
          [className]: className,
        })}
        {...restProps}
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
