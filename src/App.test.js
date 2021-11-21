import { render, screen } from "@testing-library/react";
import App from "./components/App";
import { workers } from "./workers";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("get workers file", () => {
  expect(workers.length).toBeGreaterThanOrEqual(0);
});
