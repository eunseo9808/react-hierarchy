export interface HierarchyElement {
  id: string | number;
  parentId?: string | number;
  content: string;
}

export interface HierarchyFolder extends HierarchyElement {
  items?: HierarchyItems[];
  isOpen?: boolean;
}

export type HierarchyItems = HierarchyElement | HierarchyFolder;
