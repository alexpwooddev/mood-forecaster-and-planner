import userEvent from '@testing-library/user-event';
import { render, screen } from '../utils/test-utils';
import Navbar from './Navbar';

describe("Navbar", () => {
    it("renders without crashing", () => {
        render(<Navbar />);
    });

    it("renders 4 buttons", () => {
        render(<Navbar />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(4);
    });

    it("navigates forwards one day when next date is clicked", () => {
        render(<Navbar />);
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const tomorrowDateString = tomorrowDate.toLocaleDateString();
    
        const nextDateButton = screen.getByLabelText(/right-chevron/i);
        userEvent.click(nextDateButton);
        const tomorrowDateElement = screen.getByText(tomorrowDateString, { exact: false });
        expect(tomorrowDateElement).toBeInTheDocument();
    
      });
    
      it("navigates backwards one day when previous date is clicked", () => {
        render(<Navbar />);
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayDateString = yesterdayDate.toLocaleDateString();
    
        const prevDateButton = screen.getByLabelText(/left-chevron/i);
        userEvent.click(prevDateButton);
        const yesterdayDateElement = screen.getByText(yesterdayDateString, { exact: false });
        expect(yesterdayDateElement).toBeInTheDocument();
      });
    
      it("navigates back to today's date when clicking the today button", () => {
        render(<Navbar />);
        const todayDateString = (new Date()).toLocaleDateString();
    
        const prevDateButton = screen.getByLabelText(/left-chevron/i);
        userEvent.click(prevDateButton);
    
        const todayButton = screen.getByLabelText(/today-button/i);
        userEvent.click(todayButton);
    
        const todayDateElement = screen.getByText(todayDateString, { exact: false });
        expect(todayDateElement).toBeInTheDocument();
      });


    it("opens the calendar when calendar button is clicked", () => {
        render (<Navbar />);

        const calendarButton = screen.getByLabelText(/calendar-button/i);
        userEvent.click(calendarButton);

        const calendarPreviousMonthButton = screen.getByLabelText(/Previous Month/i);
        expect(calendarPreviousMonthButton).toBeInTheDocument();
    });

    it("navigates to the correct date when a calendar date is clicked", () => {
        render (<Navbar />);

        const calendarButton = screen.getByLabelText(/calendar-button/i);
        userEvent.click(calendarButton);

        const arbitraryDate = "12";
        const calendarDateElement = screen.getByText(arbitraryDate);
        userEvent.click(calendarDateElement);

        const newDateNavigatedTo = screen.getByText(arbitraryDate, { exact: false });
        expect(newDateNavigatedTo).toBeInTheDocument();
    });

})