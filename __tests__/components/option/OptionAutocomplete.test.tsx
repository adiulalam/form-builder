import { OptionAutocomplete } from "@/components/option";
import { render, screen } from "@testing-library/react";
import {
  DraftCheckboxOptionTRPC,
  checkboxOptionData,
  DraftDropdownOptionTRPC,
  dropdownOptionData,
  DraftRadioOptionTRPC,
  radioOptionData,
} from ".";

const optionAutocompleteMapper = [
  {
    name: "checkbox",
    wrapper: DraftCheckboxOptionTRPC,
    value: checkboxOptionData.value,
  },
  {
    name: "dropdown",
    wrapper: DraftDropdownOptionTRPC,
    value: dropdownOptionData.value,
  },
  {
    name: "radio",
    wrapper: DraftRadioOptionTRPC,
    value: radioOptionData.value,
  },
];

describe("Test the 'OptionAutocomplete' component on draft", () => {
  optionAutocompleteMapper.forEach(({ wrapper, value, name }) => {
    it(`Should test OptionAutocomplete ${name}`, () => {
      render(<OptionAutocomplete />, {
        wrapper,
      });

      expect(screen.getByText(/Add values/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Add values here/i),
      ).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();

      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
