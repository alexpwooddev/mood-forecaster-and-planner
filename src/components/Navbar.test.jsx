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

})