import { render, screen } from "@testing-library/react";
import App from "./App";

test("Testing", () => {
  render(<App />);
  const linkElement = screen.getByText("Testing");
  expect(linkElement).toBeInTheDocument();
});
