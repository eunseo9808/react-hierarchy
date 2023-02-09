import React, {
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { HierarchyContext } from "./HierarchyContext";
import styles from "./styles.module.scss";
import { HierarchyTreeElement } from "./HierarchyTreeElement";

const divideChildren = (children: ReactNode) => {
  const childrenArray = React.Children.toArray(children);
  const treeNodeChildren: ReactNode[] = [];
  const normalChildren: ReactNode[] = [];

  childrenArray.forEach((child) => {
    if (
      isValidElement(child) &&
      (child.type === HierarchyTreeFolder ||
        child.type === HierarchyTreeElement)
    ) {
      treeNodeChildren.push(child);
    } else {
      normalChildren.push(child);
    }
  });
  return [treeNodeChildren, normalChildren];
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const HierarchyTreeFolder: React.FC<Props> = (props: Props) => {
  const { children, ...restProps } = props;
  const { defaultIsFold } = useContext(HierarchyContext);
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsFold);
  const [treeNodeChildren, normalChildren] = divideChildren(children);

  const handleFolderClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.folderWrapper}>
      <div className={styles.node} {...restProps} onClick={handleFolderClick}>
        {normalChildren}
      </div>
      {isOpen && <div className={styles.folder}>{treeNodeChildren}</div>}
    </div>
  );
};

export default HierarchyTreeFolder;
