import React, {
  createContext,
  ReactNode,
  Ref,
  useCallback,
  useRef,
} from "react";

type HierarchyContextType = {
  defaultIsFold: boolean;
  depthInLength: number;
  setTreeRootRef: (ref: Ref<HTMLDivElement>) => void;
};

export const HierarchyContext = createContext<HierarchyContextType>({
  defaultIsFold: false,
  depthInLength: 20,
  setTreeRootRef: () => {},
});

interface Props {
  children: ReactNode;
  defaultIsFold: boolean;
  depthInLength: number;
}

export const HierarchyContextProvider = (props: Props) => {
  const { children, defaultIsFold, depthInLength } = props;
  const treeRootRef = useRef<Ref<HTMLDivElement>>(null);

  const setTreeRootRef = useCallback((ref: Ref<HTMLDivElement>) => {
    treeRootRef.current = ref;
  }, []);

  return (
    <HierarchyContext.Provider
      value={{ defaultIsFold, depthInLength, setTreeRootRef }}
    >
      {children}
    </HierarchyContext.Provider>
  );
};
