import React, {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HierarchyContext } from "./HierarchyContext";
import styles from "./styles.module.scss";
import { HierarchyTreeElement } from "./HierarchyTreeElement";
import cx from "classnames";

const divideChildren = (children: React.ReactNode, depth: number) => {
  const childrenArray = React.Children.toArray(children);
  const treeNodeChildren: ReactNode[] = [];
  const normalChildren: ReactNode[] = [];

  childrenArray.forEach((child, deps) => {
    if (
      isValidElement(child) &&
      (child.type === HierarchyTreeFolder ||
        child.type === HierarchyTreeElement)
    ) {
      const newProps = {
        ...child.props,
        depth: depth + 1,
      };
      const newChild = cloneElement(child, newProps);
      treeNodeChildren.push(newChild);
    } else {
      normalChildren.push(child);
    }
  });
  return [treeNodeChildren, normalChildren];
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  depth?: number;
}

const HierarchyTreeFolder: React.FC<Props> = (props: Props) => {
  const { children, depth = 0, className = "", style, ...restProps } = props;
  const { defaultIsFold, depthInLength } = useContext(HierarchyContext);
  const [isOpen, setIsOpen] = useState<boolean>(!defaultIsFold);
  const [treeNodeChildren, normalChildren] = divideChildren(children, depth);
  const childrenRef = useRef<HTMLDivElement>(null);

  const handleFolderClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (restProps.onClick) restProps.onClick(e);
    setIsOpen((prev) => !prev);

    if (!childrenRef.current) return;
    if (!isOpen) {
      recursiveChangeHeight(
        childrenRef.current,
        childrenRef.current.scrollHeight
      );
    } else {
      recursiveChangeHeight(
        childrenRef.current,
        -childrenRef.current.scrollHeight
      );
    }
  };

  const recursiveChangeHeight = useCallback(
    (element: HTMLElement, targetHeight: number): any => {
      const treeType = element.getAttribute("tree-type");
      if (treeType === "root") return;
      if (treeType === "folder-children") {
        let elementHeight = parseInt(element.style.height.replace("px", ""));
        elementHeight += targetHeight;
        element.style.height = elementHeight + "px";
      }

      if (element.parentElement === null) return;

      return recursiveChangeHeight(element.parentElement, targetHeight);
    },
    []
  );

  useEffect(() => {
    if (!childrenRef.current) return;
    if (isOpen) {
      childrenRef.current.style.height =
        childrenRef.current.scrollHeight + "px";
    } else {
      childrenRef.current.style.height = "0px";
    }
  }, [isOpen]);

  return (
    <div
      className={cx(styles.folder, {
        [className]: className,
      })}
      {...restProps}
    >
      <div
        className={styles.node}
        style={{ marginLeft: depthInLength * depth, ...style }}
        onClick={handleFolderClick}
      >
        {normalChildren}
      </div>
      <div
        ref={childrenRef}
        className={styles.children}
        tree-type="folder-children"
      >
        {treeNodeChildren}
      </div>
    </div>
  );
};

export default HierarchyTreeFolder;
