import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
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

  const nodeRef = useRef<HTMLDivElement>(null);
  const { depthInLength } = useContext(HierarchyContext);

  return (
    <div
      ref={nodeRef}
      className={cx(styles.node, {
        [className]: className,
      })}
      {...restProps}
      tree-type="element"
      style={{ marginLeft: depthInLength * depth, ...style }}
    >
      {children}
    </div>
  );
};

export default HierarchyTreeElement;
