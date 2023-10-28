import type { ReactNode } from "react";
import { Type, type Question, type Option } from "@prisma/client";
import { FormProvider, QuestionProvider, OptionProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";
import type {
  FormProviderType,
  OptionProviderType,
  QuestionProviderType,
} from "@/types/Provider.types";
import crypto from "crypto";
import { formData, formDataCompleted } from "../form";

type Props = {
  children: ReactNode;
};

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

const inputOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07e",
  "input",
);

// const CheckboxOptionProviders = ({
//   children,
//   store = checkboxOptionData,
// }: {
//   children?: ReactNode;
//   store: OptionProviderType;
// }) => (
//   <FormDraftQuestionsCheckbox>
//     <OptionProvider store={store}>{children}</OptionProvider>
//   </FormDraftQuestionsCheckbox>
// );

// const CheckboxOptionProviders = ({
//   children,
//   store = allQuestionsData,
//   questionStore = questionNullData,
// }: {
//   children?: ReactNode;
//   store: FormProviderType;
//   questionStore: QuestionProviderType;
// }) => (
//   <FormProvider store={store}>
//     <QuestionProvider store={questionStore}>{children}</QuestionProvider>
//   </FormProvider>
// );

// export const AllQuestionTRPC = api.withTRPC(CheckboxOptionProviders);
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
