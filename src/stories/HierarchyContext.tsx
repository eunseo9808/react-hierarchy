import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type HierarchyContextType = {
  defaultIsFold: boolean;
  depthInLength: number;
};

export const HierarchyContext = createContext<HierarchyContextType>({
  defaultIsFold: false,
  depthInLength: 20,
});

interface Props extends HierarchyContextType {
  children: ReactNode;
}

export const HierarchyContextProvider = (props: Props) => {
  const { children, defaultIsFold, depthInLength } = props;

  return (
    <HierarchyContext.Provider value={{ defaultIsFold, depthInLength }}>
      {children}
    </HierarchyContext.Provider>
  );
};
