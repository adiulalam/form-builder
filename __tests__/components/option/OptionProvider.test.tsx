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
import { FormDraftQuestionsCheckbox } from "../question";

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
  showInput: false,
  isOtherOption: false,
  createdAt: new Date("2023-10-24T00:39:13.336Z"),
  updatedAt: new Date("2023-10-24T00:39:13.336Z"),
});

const checkboxOptionData = optionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07b",
  "checkbox",
);
const checkboxOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07b",
);

const dropdownOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07c",
);
const radioOtherOptionData = otherOptionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07d",
);

const CheckboxOptionProviders = ({
  children,
  store = checkboxOptionData,
}: {
  children?: ReactNode;
  store: OptionProviderType;
}) => (
  <FormDraftQuestionsCheckbox>
    <OptionProvider store={store}>{children}</OptionProvider>
  </FormDraftQuestionsCheckbox>
);

export const AllQuestionTRPC = api.withTRPC(CheckboxOptionProviders);
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
