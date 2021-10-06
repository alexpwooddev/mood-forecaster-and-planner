import { render, screen } from "@testing-library/react";
import { Navbar } from './Navbar';

describe("Navbar", () => {
    it("renders without crashing", () => {
        render(<Navbar />);
    });

    it("renders 4 buttons", () => {
        render(<Navbar />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(4);
    });

    it("renders a calendar icon with the correct src and alt attributes", () => {
        render(<Navbar />);
        const icon = screen.getByRole("img");
        expect(icon).toHaveAttribute('src', 'icons/calendar.png');
        expect(icon).toHaveAttribute('alt', 'calendar icon');
    })

})