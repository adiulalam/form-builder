import { QuestionCardMenu } from "@/components/question";
import { render, screen, act } from "@testing-library/react";
import { menuMapper } from ".";

describe("Test the 'QuestionCardMenu' component", () => {
  menuMapper.forEach(({ wrapper, type, text }) => {
    it(`Should return card menu ${type} type of draft status`, () => {
      render(<QuestionCardMenu />, { wrapper });
      expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
      expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();

      const button = screen.getByLabelText("Open menu");

      act(() => {
        button.click();
      });
      expect(screen.getByRole("menu")).toBeInTheDocument();

      expect(screen.getByText(`${text} DROPDOWN`)).toBeInTheDocument();
      expect(screen.getByTestId("ArrowDropDownCircleIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} CHECKBOX`)).toBeInTheDocument();
      expect(screen.getByTestId("CheckBoxIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} RADIO`)).toBeInTheDocument();
      expect(screen.getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} INPUT`)).toBeInTheDocument();
      expect(screen.getByTestId("KeyboardIcon")).toBeInTheDocument();

      expect(screen.getByText(/Delete/i)).toBeInTheDocument();
      expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();

      if (type) {
        expect(screen.getByTestId(type)).toHaveAttribute(
          "aria-disabled",
          "true"
        );
      }
    });
  });
});
