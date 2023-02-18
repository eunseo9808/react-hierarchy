import { css } from "@emotion/react";
import React, {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { HierarchyContext } from "../context/HierarchyContext";
import { HierarchyTreeElement } from "./HierarchyTreeElement";

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
  const { children, depth = 0, ...restProps } = props;
  const { defaultIsFold, animation } = useContext(HierarchyContext);
  const [isOpen, setIsOpen] = useState<boolean>(!defaultIsFold);
  const [treeNodeChildren, normalChildren] = divideChildren(children, depth);
  const childrenRef = useRef<HTMLDivElement>(null);

  const handleFolderClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (restProps.onClick) restProps.onClick(e);
    setIsOpen((prev) => !prev);

    if (!childrenRef.current) return;

    let changeHeight = startAnimationSetting();
    changeHeight = isOpen ? -changeHeight : changeHeight;

    moveSiblingElements(changeHeight);
    if (changeHeight < 0) {
      setTimeout(() => {
        recursiveChangeHeight(childrenRef.current, changeHeight);
      }, 500);
      childrenRef.current.style.opacity = "0";
    } else {
      recursiveChangeHeight(childrenRef.current, changeHeight);
      childrenRef.current.style.opacity = "0.99";
    }
  };

  const startAnimationSetting = (): number => {
    if (!childrenRef.current) return 0;

    let childrenHeight = 0;
    for (const child of childrenRef.current.children) {
      if (isOpen) {
        (
          child as HTMLElement
        ).style.transform = `translateY(${-child.scrollHeight}px)`;
      } else {
        (
          child as HTMLElement
        ).style.transform = `translateY(${childrenHeight}px)`;
      }
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

  const moveSiblingElements = (changeHeight: number) => {
    let nextSibling = childrenRef.current?.parentElement?.nextElementSibling;

    while (nextSibling) {
      const nowSibling = nextSibling as HTMLElement;
      const regex = /[-]?\d+(.\d+)?px/gi;
      let nowTransform = nowSibling.style.transform.match(regex);
      if (nowTransform) {
        nowSibling.style.transform = `translateY(${
          parseFloat(nowTransform[0].slice(0, -2)) + changeHeight
        }px)`;
      } else nowSibling.style.transform = `translateY(${changeHeight}px)`;

      nextSibling = nextSibling.nextElementSibling;
    }
  };

  const recursiveChangeHeight = (
    element: HTMLElement | null,
    changeHeight: number
  ): any => {
    if (!element) return;
    const treeType = element.getAttribute("tree-type");
    if (treeType === "root") return;
    if (treeType === "folder-children") {
      let elementHeight = parseFloat(element.style.height.replace("px", ""));

      elementHeight += changeHeight;
      element.style.height = `${elementHeight}px`;
    }

    if (element.parentElement === null) return;

    return recursiveChangeHeight(element.parentElement, changeHeight);
  };

  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
      `}
      style={{
        transition: animation ? "transform 0.5s" : "",
      }}
      tree-type="folder"
    >
      <HierarchyTreeElement
        {...restProps}
        depth={depth}
        onClick={handleFolderClick}
      >
        <span>{normalChildren}</span>
      </HierarchyTreeElement>
      <div
        ref={childrenRef}
        css={css`
          overflow: hidden;
        `}
        tree-type="folder-children"
        tree-open={isOpen ? "true" : "false"}
        style={{ transition: animation ? "opacity 0.3s" : "" }}
      >
        {treeNodeChildren}
      </div>
    </div>
  );
};

export default HierarchyTreeFolder;
