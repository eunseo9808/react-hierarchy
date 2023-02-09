import React, { createContext, ReactNode, useEffect, useState } from "react";

type HierarchyContextType = {
  defaultIsFold: boolean;
};

export const HierarchyContext = createContext<HierarchyContextType>({
  defaultIsFold: false,
});

interface Props {
  children: ReactNode;
  defaultIsFold: boolean;
}

export const HierarchyContextProvider = (props: Props) => {
  const { children, defaultIsFold } = props;
  return (
    <HierarchyContext.Provider value={{ defaultIsFold }}>
      {children}
    </HierarchyContext.Provider>
  );
};
