import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NavBar } from "../index";
import { BrowserRouter } from "react-router-dom";

describe("navbar", () => {
  it("searching text", () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    screen.debug();
    console.log(container);
    const sectionClass = container.querySelector(".point");
    expect(sectionClass).toBeInTheDocument();
  });
});
