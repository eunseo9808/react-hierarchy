import React, { HTMLAttributes, ReactNode, useContext } from "react";
import { css } from "@emotion/react";
import { HierarchyContext } from "../context/HierarchyContext";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  depth?: number;
}

export const HierarchyTreeElement: React.FC<Props> = (props: Props) => {
  const { children, depth = 0, className = "", ...restProps } = props;

  const { depthInLength, animation } = useContext(HierarchyContext);

  return (
    <div
      className={className}
      css={css`
        position: absolute;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        padding: 12px 8px;
        box-sizing: border-box;
        height: 60px;
        border-radius: 5px;

        background-color: white;
        user-select: none;
        cursor: pointer;

        &:hover {
          background-color: #dddddd;
        }
      `}
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
