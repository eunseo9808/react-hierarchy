export interface Items {
  id: string | number;
  parentId?: string | number;
  content: string;
  items?: Items[];
}
