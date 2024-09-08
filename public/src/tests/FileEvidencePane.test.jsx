import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import "../hooks/useOAuthAPI";
jest.mock("../hooks/useOAuthAPI");

import FileEvidencePane from "../components/panes/FileEvidencePane";

import { mockEvidenceFiles } from "../hooks/__mocks__/useOAuthAPI";

describe("FileEvidencePane.jsx", () => {
  test("Renders mock evidence files", async () => {
    const { container } = render(
      <FileEvidencePane evidence={mockEvidenceFiles} />
    );
    const rows = container.querySelector("tr");
    expect(rows).toBeInTheDocument();
    expect(rows.length).toEqual(mockEvidenceFiles.length);
  });
  test("Adds files correctly", async () => {});
  test("Removes files correctly", async () => {});
  test("Adds trends correctly", async () => {});
  test("Removes trends correctly", async () => {});
  test("Updates trend names correctly", async () => {});
});
