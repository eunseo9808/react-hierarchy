import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Hierarchy from "../src/hierarchy";

describe("Hierarchy", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Hierarchy
        data={[
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
                content: "element2",
              },
              {
                id: 4,
                parentId: 1,
                content: "element3",
              },
            ],
          },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
