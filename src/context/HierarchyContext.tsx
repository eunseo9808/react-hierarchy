import React, { createContext, ReactNode } from "react";
import { HierarchyProps } from "../types/HierarchyProps";

export const HierarchyContext = createContext<HierarchyProps>({
  defaultIsFold: true,
  depthInLength: 20,
  animation: true,
});

interface Props extends Partial<HierarchyProps> {
  children: ReactNode;
}

export const HierarchyContextProvider = (props: Props) => {
  const {
    children,
    defaultIsFold = true,
    depthInLength = 20,
    animation = true,
  } = props;

  return (
    <HierarchyContext.Provider
      value={{
        defaultIsFold,
        depthInLength,
        animation,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
};
