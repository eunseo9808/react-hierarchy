import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Hierarchy from "../src/hierarchy";
import { item } from "./data/item";

describe("Hierarchy", () => {
  it("render correctly", () => {
    const { getByText } = render(<Hierarchy data={item} />);
    const rootFolder = getByText("folder1");
    const element1 = getByText("element1");
    const element2 = getByText("element2");

    expect(rootFolder).toBeInTheDocument();
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });

  it("open / close folder", () => {
    const obToggleFolder = jest.fn();
    const { getByText, container } = render(
      <Hierarchy data={item} onToggleFolder={obToggleFolder} />
    );

    const rootFolder = getByText("folder1");
    fireEvent.click(rootFolder);

    const folderChildren = container.querySelector(
      '[tree-type="folder-children"]'
    );

    expect(obToggleFolder).toHaveBeenCalled();
    expect(obToggleFolder.mock.calls[0][2]).toBeTruthy();
    expect(folderChildren!.getAttribute("tree-open")).toBe("true");

    fireEvent.click(rootFolder);
    console.log(obToggleFolder.mock.calls);
    expect(obToggleFolder).toHaveBeenCalledTimes(2);
    expect(obToggleFolder.mock.calls[1][2]).toBeFalsy();
    expect(folderChildren!.getAttribute("tree-open")).toBe("false");
  });

  it("click element", () => {
    const obClickElement = jest.fn();
    const { getByText } = render(
      <Hierarchy data={item} onClickElement={obClickElement} />
    );

    const element = getByText("element1");
    fireEvent.click(element);
    expect(obClickElement).toHaveBeenCalled();
  });

  it("folder template", () => {
    const { getByText } = render(
      <Hierarchy
        data={item}
        folderTemplate={({ content, isOpened }) => (
          <div>
            {isOpened ? "open" : "close"} {content}
          </div>
        )}
      />
    );
    const rootFolder = getByText("close folder1");
    expect(rootFolder).toBeInTheDocument();

    fireEvent.click(rootFolder);
    expect(rootFolder.textContent).toBe("open folder1");
  });
});
