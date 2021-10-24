import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "./utils/test-utils";

import App from "./App";


describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("changes to different form values when date is changed", async () => {
    render(<App />);

    await waitFor(() => screen.getByText(/loading.../i));
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    // formStatus never changes in this test render, and so 'loading...' is never removed
    // even after I've moved the dispatch of fetchForms 
    // to the App component
    
    // the Form component isn't yet rendered, even with use of await and findBy (vs getBy)
    const morningTextArea = await screen.findByLabelText(/morningText/i);
    userEvent.type(morningTextArea, "test text");
    expect(morningTextArea).toHaveValue("test text");

    const nextDateButton = screen.getByLabelText(/right-chevron/i);
    userEvent.click(nextDateButton);

    await waitFor(() => screen.getByLabelText(/morningText/i));
    expect(screen.getByLabelText(/morningText/i)).toHaveValue("");
  });
});
