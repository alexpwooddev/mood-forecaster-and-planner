import { render, screen } from '../utils/test-utils';
import Modal from './Modal';

describe("Modal", () => {
    it("renders without crashing", () => {
        render(<Modal />);
    });

    it("renders the given title", () => {
        render(<Modal title="Test Title" />);
        expect(screen.getByText(/test title/i)).toBeInTheDocument();
    });

    it("renders the given message", () => {
        render(<Modal message="Test Message" />);
        expect(screen.getByText(/test message/i)).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(<Modal />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

})