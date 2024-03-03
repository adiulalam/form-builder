import { QuestionType } from "@/components/question";
import { render, screen } from "@testing-library/react";
import { menuMapper } from ".";

describe("Test the 'QuestionType' component", () => {
  menuMapper.forEach(({ wrapper, type, text }) => {
    it(`Should return question type ${type} of draft status`, () => {
      render(<QuestionType handleClose={() => null} />, { wrapper });

      expect(screen.getByText(`${text} DROPDOWN`)).toBeInTheDocument();
      expect(screen.getByTestId("ArrowDropDownCircleIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} CHECKBOX`)).toBeInTheDocument();
      expect(screen.getByTestId("CheckBoxIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} RADIO`)).toBeInTheDocument();
      expect(screen.getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} INPUT`)).toBeInTheDocument();
      expect(screen.getByTestId("KeyboardIcon")).toBeInTheDocument();

      if (type) {
        expect(screen.getByTestId(type)).toHaveAttribute(
          "aria-disabled",
          "true"
        );
      }
    });
  });
});
