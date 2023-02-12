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
import { HierarchyContext } from "../context/HierarchyContext";
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

    const deltaTranslateY = getChildrenHeight();

    if (isOpen) {
      moveSiblingElements(-deltaTranslateY);
      recursiveChangeHeight(childrenRef.current, -deltaTranslateY);
      childrenRef.current.style.clipPath = `polygon(0 0, 0 0, 0 0, 0 0)`;
    } else {
      moveSiblingElements(deltaTranslateY);
      recursiveChangeHeight(childrenRef.current, deltaTranslateY);
      childrenRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${deltaTranslateY}px, 0 ${deltaTranslateY}px)`;
    }
  };

  const getChildrenHeight = (): number => {
    if (!childrenRef.current) return 0;

    let childrenHeight = 0;
    for (const child of childrenRef.current.children) {
      childrenHeight += recursiveGetChildrenHeight(child as HTMLElement);
    }

    return childrenHeight;
  };

  const recursiveGetChildrenHeight = (element: HTMLElement): number => {
    const treeType = element.getAttribute("tree-type");

    if (
      treeType === "folder-children" &&
      element.getAttribute("tree-open") === "false"
    ) {
      return 0;
    }

    if (treeType === "folder" || treeType === "folder-children") {
      let childrenHeight = 0;

      for (const child of element.children) {
        childrenHeight += recursiveGetChildrenHeight(child as HTMLElement);
      }

      return childrenHeight;
    }

    return element.scrollHeight;
  };

  const moveSiblingElements = (deltaTranslateY: number) => {
    let nextSibling = childrenRef.current?.parentElement?.nextElementSibling;

    while (nextSibling) {
      const nowSibling = nextSibling as HTMLElement;
      const regex = /[-]?\d+(.\d+)?px/gi;
      let nowTransform = nowSibling.style.transform.match(regex);
      if (nowTransform) {
        nowSibling.style.transform = `translateY(${
          parseFloat(nowTransform[0].slice(0, -2)) + deltaTranslateY
        }px)`;
      } else nowSibling.style.transform = `translateY(${deltaTranslateY}px)`;

      nextSibling = nextSibling.nextElementSibling;
    }
  };

  const recursiveChangeHeight = useCallback(
    (element: HTMLElement, targetHeight: number): any => {
      const treeType = element.getAttribute("tree-type");
      if (treeType === "root") return;
      if (treeType === "folder-children") {
        const regex = /[-]?[1-9]+(.\d+)?px/gi;
        const heightMatch = element.style.clipPath.match(regex);
        let elementHeight = 0;
        if (heightMatch) {
          elementHeight =
            parseFloat(heightMatch[0].slice(0, -2)) + targetHeight;
          elementHeight += targetHeight;
        }
        element.style.clipPath = `polygon(0 0, 100% 0, 100% ${elementHeight}px, 0 ${elementHeight}px)`;
      }

      if (element.parentElement === null) return;

      return recursiveChangeHeight(element.parentElement, targetHeight);
    },
    []
  );

  return (
    <div
      className={cx(styles.folder, {
        [className]: className,
      })}
      {...restProps}
      tree-type="folder"
    >
      <HierarchyTreeElement
        className={styles.node}
        depth={depth}
        onClick={handleFolderClick}
      >
        <span>{normalChildren}</span>
      </HierarchyTreeElement>
      <div
        ref={childrenRef}
        className={styles.children}
        tree-type="folder-children"
        tree-open={isOpen ? "true" : "false"}
      >
        {treeNodeChildren}
      </div>
    </div>
  );
};

export default HierarchyTreeFolder;
