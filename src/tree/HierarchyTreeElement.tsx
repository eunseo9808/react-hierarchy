import React, { HTMLAttributes, ReactNode, useContext } from "react";
import styles from "./styles.module.scss";
import { HierarchyContext } from "../context/HierarchyContext";
import cx from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  depth?: number;
}

export const HierarchyTreeElement: React.FC<Props> = (props: Props) => {
  const {
    children,
    depth = 0,
    className = "",
    style = {},
    ...restProps
  } = props;
  const { depthInLength } = useContext(HierarchyContext);

  return (
    <div
      className={cx(styles.node, {
        [className]: className,
      })}
      {...restProps}
      style={{ marginLeft: depthInLength * depth, ...style }}
    >
      {children}
    </div>
  );
};

export default HierarchyTreeElement;
