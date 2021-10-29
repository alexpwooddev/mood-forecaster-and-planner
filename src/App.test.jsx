import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
} from "./utils/test-utils";

import App from "./App";


describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("receives input then changes to empty form value when date is changed, then retains input when date is changed back", async () => {
    render(<App />);
    const userInputValue = 'test text'

    const morningTextArea = await screen.findByLabelText(/morningText/i);
    userEvent.type(morningTextArea, userInputValue);
    expect(morningTextArea).toHaveValue(userInputValue);

    await screen.findByText(/saved/i);

    const nextDateButton = screen.getByLabelText(/right-chevron/i);
    userEvent.click(nextDateButton);

    await waitFor(() => screen.getByLabelText(/morningText/i));
    expect(screen.getByLabelText(/morningText/i)).toHaveValue("");

    const previousDateButton = screen.getByLabelText(/left-chevron/i);
    userEvent.click(previousDateButton);

    await waitFor(() => screen.getByLabelText(/morningText/i));
    expect(await screen.findByLabelText(/morningText/i)).toHaveValue(userInputValue);
  });
});
