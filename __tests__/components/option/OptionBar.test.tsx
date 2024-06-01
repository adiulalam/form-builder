import { OptionBar } from "@/components/option";
import { render, screen } from "@testing-library/react";
import {
  DraftInputOptionTRPC,
  DraftCheckboxOptionTRPC,
  DraftDropdownOptionTRPC,
  DraftRadioOptionTRPC,
} from ".";
import { Type } from "@prisma/client";
import { includesInputType } from "@/utils/arrayFunction";

const optionBarMapper = [
  {
    name: Type.CHECKBOX,
    wrapper: DraftCheckboxOptionTRPC,
  },
  {
    name: Type.DROPDOWN,
    wrapper: DraftDropdownOptionTRPC,
  },
  {
    name: Type.RADIO,
    wrapper: DraftRadioOptionTRPC,
  },
  {
    name: Type.INPUT,
    wrapper: DraftInputOptionTRPC,
  },
];

describe("Test the 'OptionBar' component", () => {
  optionBarMapper.forEach(({ wrapper, name }) => {
    it(`Should test OptionBar ${name} children`, () => {
      render(<OptionBar />, {
        wrapper,
      });

      const isInputType = includesInputType(name);

      if (isInputType) {
        expect(screen.getByTestId("OptionTextField")).toBeInTheDocument();
      } else {
        expect(screen.getByTestId("OptionAutocomplete")).toBeInTheDocument();
      }
    });
  });
});
