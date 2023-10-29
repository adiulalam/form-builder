import { OptionBar } from "@/components/option";
import { render, screen } from "@testing-library/react";
import {
  DraftInputOptionTRPC,
  DraftCheckboxOptionTRPC,
  DraftDropdownOptionTRPC,
  DraftRadioOptionTRPC,
} from ".";

const optionBarMapper = [
  {
    name: "checkbox",
    wrapper: DraftCheckboxOptionTRPC,
  },
  {
    name: "dropdown",
    wrapper: DraftDropdownOptionTRPC,
  },
  {
    name: "radio",
    wrapper: DraftRadioOptionTRPC,
  },
  {
    name: "input",
    wrapper: DraftInputOptionTRPC,
  },
];

describe("Test the 'OptionBar' component", () => {
  optionBarMapper.forEach(({ wrapper, name }) => {
    it(`Should test OptionBar ${name}`, () => {
      render(<OptionBar />, {
        wrapper,
      });

      if (name !== "input") {
        const input = screen.getByPlaceholderText(/Add values here/i);
        expect(input).not.toHaveAttribute("readonly");
      }

      expect(
        screen.getByLabelText(name === "input" ? "INPUT" : "OTHER"),
      ).toBeInTheDocument();
      const otherInput = screen.getByPlaceholderText(/Type here/i);
      expect(otherInput).toHaveAttribute("readonly");
    });
  });
});
