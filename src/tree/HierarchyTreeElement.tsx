import React, { HTMLAttributes, ReactNode, useContext } from "react";
import styles from "./styles.module.scss";
import { HierarchyContext } from "../context/HierarchyContext";
import cx from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  depth?: number;
}

export const HierarchyTreeElement: React.FC<Props> = (props: Props) => {
  const { children, depth = 0, className = "", ...restProps } = props;

  const { depthInLength, animation } = useContext(HierarchyContext);

  return (
    <div
      className={cx(styles.node, {
        [className]: className,
      })}
      {...restProps}
      tree-type="element"
      style={{
        ...restProps.style,
        marginLeft: depthInLength * depth,
        transition: animation ? "transform 0.5s" : "",
      }}
    >
      {children}
    </div>
  );
};

export default HierarchyTreeElement;
