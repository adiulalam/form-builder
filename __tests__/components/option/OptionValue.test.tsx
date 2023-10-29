import { OptionValue } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC, checkboxOptionData } from ".";
import { type AutocompleteRenderGetTagProps } from "@mui/material";

describe("Test the 'OptionValue' component", () => {
  const getTagProps = ({ index }: { index: number }) => ({
    key: index,
    className: "",
    disabled: false,
    "data-tag-index": index,
    tabIndex: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    onDelete: (event: any) => null,
  });

  it("Should return valid placeholder and attribute", () => {
    render(
      <OptionValue
        getTagProps={getTagProps as AutocompleteRenderGetTagProps}
        index={0}
        option={checkboxOptionData}
      />,
      {
        wrapper: DraftCheckboxOptionTRPC,
      },
    );

    expect(screen.getByText(checkboxOptionData.value)).toBeInTheDocument();
  });
});
