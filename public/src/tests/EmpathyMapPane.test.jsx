import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import EmpathyMapPane from "../components/panes/EmpathyMapPane";
import { AllTagsContext } from "../contexts/AllTagsContext";
import { getOccurenceNumber } from "../../../util";
import { indexToClassName } from "../components/panes/EmpathyMapPaneFunctions";

const mockEmpathyMapAllTags = [
  {
    id: "tag1",
    text: " tag1",
    className: "objective",
  },
  {
    id: "tag1",
    text: " tag1",
    className: "objective",
  },
  {
    id: "tag2",
    text: " tag2",
    className: "goal",
  },
];

describe("EmpathyMapPane.jsx", () => {
  test("Renders mock allTags correctly", async () => {
    const { container } = render(
      <AllTagsContext.Provider value={mockEmpathyMapAllTags}>
        <EmpathyMapPane />
      </AllTagsContext.Provider>
    );
    const rows = container.querySelector("tr");
    expect(rows).toBeInTheDocument();
    rows.forEach((row, index) => {
      const className = indexToClassName[index];
      const count = getOccurenceNumber(row.innerText);
      // expect(count).toEqual(...); // number in mockEmpathyMapAllTags
    });
    expect(rows.length).toEqual(mockEmpathyMapAllTags.length);
  });
  test("Changes tag classNames correctly", async () => {});
});
