import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "../../utils/test-utils";
import Form from "./Form";

describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form />);
  });

  it("renders the correct legend for fieldset 1", () => {
    render(<Form />);
    const legend = screen.getByText(/Wellbeing forecast/i);
    expect(legend).toBeInTheDocument();
  });

  it("renders a mood label", () => {
    render(<Form />);
    const moodLabel = screen.getByText(/mood/i);
    expect(moodLabel).toBeInTheDocument();
  });

  it("renders a mood range input", () => {
    render(<Form />);
    const moodRange = screen.getByRole("slider", { name: /mood/i });
    expect(moodRange).toBeInTheDocument();
  });

  it("renders an energy label", () => {
    render(<Form />);
    const energyLabel = screen.getByText(/energy/i);
    expect(energyLabel).toBeInTheDocument();
  });

  it("renders an energy range input", () => {
    render(<Form />);
    const energyRange = screen.getByRole("slider", { name: /energy/i });
    expect(energyRange).toBeInTheDocument();
  });

  it("renders the correct table heading", () => {
    render(<Form />);
    const tableHeadContent = screen.getByText(/Activities I will do today:/i);
    expect(tableHeadContent).toBeInTheDocument();
  });

  it("renders 3 text area inputs", () => {
    render(<Form />);
    const textAreaInputs = screen.getAllByRole("textbox");
    expect(textAreaInputs).toHaveLength(3);
  });

  it("renders 3 checkbox inputs", () => {
    render(<Form />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });

  it("renders changes to text values from user", () => {
    render(<Form />);
    const userInputValue = "test text";
    const morningTextArea = screen.getByLabelText(/morningText/i);
    userEvent.type(morningTextArea, userInputValue);
    expect(morningTextArea).toHaveValue(userInputValue);
  });

  it("renders changes to checkbox values", () => {
    render(<Form />);

    const eveningCheckbox = screen.getByLabelText("eveningCheckbox");
    userEvent.click(eveningCheckbox);

    expect(eveningCheckbox.checked).toEqual(true);
  });

  it("renders a 'saved' display initially", async () => {
    render(<Form />);
    const savedDisplay = await screen.findByText(/saved/i);
    expect(savedDisplay).toBeInTheDocument();
  });

  it("renders 'saving' display after an input change then 'saved' display again", async () => {
    render(<Form />);
    const userInputValue = "test text";

    const morningTextArea = await screen.findByLabelText(/morningText/i);
    userEvent.type(morningTextArea, userInputValue);
    expect(morningTextArea).toHaveValue(userInputValue);

    const savingDisplay = screen.getByText(/saving/i);
    expect(savingDisplay).toBeInTheDocument();

    const savedDisplay = await screen.findByText(/saved/i);
    expect(savedDisplay).toBeInTheDocument();
  });

  it("opens a modal when a range less than 5 is selected and closes it again when clicked", () => {
    render(<Form />);

    const moodRange = screen.getByRole("slider", { name: /mood/i });
    fireEvent.change(moodRange, { target: { value: 3 } });

    expect(screen.getByText(/It's looking foggy/i)).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);

    expect(screen.queryByText(/It's looking foggy/i)).not.toBeInTheDocument();
  });
});
