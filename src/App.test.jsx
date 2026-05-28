import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the opener screen with the start title", () => {
    render(<App />);
    expect(screen.getByText(/Let The Tournament Begin!/i)).toBeInTheDocument();
});
