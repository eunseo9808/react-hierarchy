import { HierarchyItems } from "../../types/HierarchyTypes";

export const items: HierarchyItems[] = [
  {
    id: 1,
    content: "folder1",
    items: [
      {
        id: 2,
        parentId: 1,
        content: "element1",
      },
      {
        id: 3,
        parentId: 1,
        content: "folder2",
        items: [
          {
            id: 4,
            content: "element2",
          },
          {
            id: 5,
            content: "element3",
          },
        ],
      },
      {
        id: 6,
        content: "element4",
      },
      {
        id: 7,
        content: "folder3",
        items: [
          {
            id: 8,
            content: "element5",
          },
        ],
      },
    ],
  },
];
