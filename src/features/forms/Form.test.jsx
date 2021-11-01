import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import Form from './Form';

describe('Form', () => {
    it('renders without crashing', () => {
        render(<Form />);
    });

    it('renders the correct legend for fieldset 1', () => {
        render(<Form />);
        const legend = screen.getByText(/Wellbeing forecast/i);
        expect(legend).toBeInTheDocument();
    });

    it('renders a mood label', () => {
        render(<Form/>);
        const moodLabel = screen.getByText(/mood/i);
        expect(moodLabel).toBeInTheDocument();
    });

    it('renders a mood range input', () => {
        render(<Form />);
        const moodRange = screen.getByRole('slider', {name: /mood/i});
        expect(moodRange).toBeInTheDocument();
    });

    it('renders an energy label', () => {
        render(<Form/>);
        const energyLabel = screen.getByText(/energy/i);
        expect(energyLabel).toBeInTheDocument();
    });

    it('renders an energy range input', () => {
        render(<Form />);
        const energyRange = screen.getByRole('slider', {name: /energy/i});
        expect(energyRange).toBeInTheDocument();
    });

    it('renders the correct table heading', () => {
        render(<Form />);
        const tableHeadContent = screen.getByText(/Activities I will do today:/i);
        expect(tableHeadContent).toBeInTheDocument();
    });

    it('renders 3 text area inputs', () => {
        render(<Form />);
        const textAreaInputs = screen.getAllByRole('textbox');
        expect(textAreaInputs).toHaveLength(3);
    });

    it('renders 3 checkbox inputs', () => {
        render(<Form />);
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(3);
    });

    it('renders changes to text values from user', () => {
        render(<Form />);
        const userInputValue = 'test text'
        const morningTextArea = screen.getByLabelText(/morningText/i);
        userEvent.type(morningTextArea, userInputValue);
        expect(morningTextArea).toHaveValue(userInputValue);
    });

    it('renders changes to checkbox values', () => {
        render(<Form />);

        const eveningCheckbox = screen.getByLabelText('eveningCheckbox');
        userEvent.click(eveningCheckbox);

        expect(eveningCheckbox.checked).toEqual(true);
    });

})