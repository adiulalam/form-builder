import type { Option } from "@prisma/client";
import { z } from "zod";
import crypto from "crypto";

const otherOptionData = (questionId: string): Option => ({
  id: crypto.randomUUID(),
  value: "OTHER",
  questionId,
  showInput: true,
  isOtherOption: true,
  createdAt: new Date("2023-10-02T22:42:34.898Z"),
  updatedAt: new Date("2023-10-02T22:42:34.898Z"),
});

const optionData = (questionId: string, value: string): Option => ({
  id: crypto.randomUUID(),
  value,
  questionId,
  showInput: value === "input",
  isOtherOption: false,
  createdAt: new Date("2023-10-24T00:39:13.336Z"),
  updatedAt: new Date("2023-10-24T00:39:13.336Z"),
});

export const checkboxOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07b",
  "checkbox",
);
export const checkboxOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07b",
);

export const dropdownOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07c",
  "dropdown",
);
export const dropdownOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07c",
);

export const radioOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07d",
  "radio",
);
export const radioOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07d",
);

export const inputOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07e",
  "input",
);

const OptionDataSchema = z
  .object({
    id: z.string().uuid(),
    value: z.string().min(1),
    questionId: z.string().uuid(),
    showInput: z.boolean(),
    isOtherOption: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .array();

describe("Test the 'questionData'", () => {
  it("Should test all string data", () => {
    const { success } = OptionDataSchema.safeParse([
      checkboxOptionData,
      checkboxOtherOptionData,
    ]);
    expect(success).toEqual(true);
  });
});
