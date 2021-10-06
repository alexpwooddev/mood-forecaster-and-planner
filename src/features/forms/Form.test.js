import { render, screen } from '@testing-library/react';
import { Form } from './Form';

describe("Form", () => {
    it("renders without crashing", () => {
        render(<Form />);
    });

    it("renders the correct legend for fieldset 1", () => {
        render(<Form />);
        const legend = screen.getByText("Today I'm feeling...");
        expect(legend).toBeInTheDocument();
    });

    it("renders a mood label", () => {
        render(<Form/>);
        const moodLabel = screen.getByText(/mood/i);
        expect(moodLabel).toBeInTheDocument();
    });

    it("renders a mood range input", () => {
        render(<Form />);
        const moodRange = screen.getByRole("slider", {name: /mood/i});
        expect(moodRange).toBeInTheDocument();
    });

    it("renders an energy label", () => {
        render(<Form/>);
        const energyLabel = screen.getByText(/energy/i);
        expect(energyLabel).toBeInTheDocument();
    });

    it("renders an energy range input", () => {
        render(<Form />);
        const energyRange = screen.getByRole("slider", {name: /energy/i});
        expect(energyRange).toBeInTheDocument();
    });

    it("renders a table", () => {
        render(<Form />);
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });

    it("renders a table with a head and body", () => {
        render(<Form />);
        const headAndBody = screen.getAllByRole("rowgroup");
        expect(headAndBody).toHaveLength(2);
    });

    it("renders the correct table head content", () => {
        render(<Form />);
        const tableHeadContent = screen.getByText(/Activities I will do today:/i);
        expect(tableHeadContent).toBeInTheDocument();
    });

    it("renders 3 text area inputs", () => {
        render(<Form />);
        const textAreaInputs = screen.getAllByRole("textbox");
        expect(textAreaInputs).toHaveLength(3);
    });

    it('renders 3 checkbox inputs', () => {
        render(<Form />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(3);
    })
})