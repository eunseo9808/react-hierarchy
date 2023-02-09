import React, { HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const HierarchyTreeElement: React.FC<Props> = (props: Props) => {
  const { children, ...restProps } = props;
  return (
    <div className={styles.node} {...restProps}>
      {children}
    </div>
  );
};

export default HierarchyTreeElement;
