import React, { HTMLAttributes, ReactNode } from "react";
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
      >
        {children}
      </div>
    </HierarchyContextProvider>
  );
};

HierarchyTree.Folder = HierarchyTreeFolder;
HierarchyTree.Element = HierarchyTreeElement;

export default HierarchyTree;
