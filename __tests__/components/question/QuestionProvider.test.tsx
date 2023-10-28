import type { ReactNode } from "react";
import { Type, type Option } from "@prisma/client";
import { FormProvider, OptionProvider, QuestionProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";
import type {
  FormProviderType,
  OptionProviderType,
  QuestionProviderType,
} from "@/types/Provider.types";
import { formData, formDataCompleted } from "../form";
import crypto from "crypto";
import {
  checkboxOptionData,
  checkboxOtherOptionData,
  dropdownOptionData,
  dropdownOtherOptionData,
  radioOptionData,
  radioOtherOptionData,
} from "../option";

type Props = {
  children: ReactNode;
};

const questionData = (
  id: string,
  question: string,
  type: Type | null,
  options: Option[],
): QuestionProviderType => ({
  id,
  question,
  type,
  order: 1,
  formId: "80bbdd42-4d13-410e-abb7-79b0c81e3d32",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
  options,
});

export const questionNullData = questionData(
  crypto.randomUUID(),
  "Null question",
  null,
  [],
);
export const questionCheckboxData = questionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07b",
  "Checkbox question",
  "CHECKBOX",
  [checkboxOptionData, checkboxOtherOptionData],
);
export const questionDropdownData = questionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07c",
  "Dropdown question",
  "DROPDOWN",
  [dropdownOptionData, dropdownOtherOptionData],
);
export const questionRadioData = questionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07d",
  "Radio question",
  "RADIO",
  [radioOptionData, radioOtherOptionData],
);
export const questionInputData = questionData(
  "d81bd283-704f-43b1-aacc-108cedb2f07e",
  "Input question",
  "INPUT",
  [],
);

export const allQuestionsData: FormProviderType = {
  ...formData,
  questions: [
    questionNullData,
    questionCheckboxData,
    questionDropdownData,
    questionRadioData,
    questionInputData,
  ],
};

const questionsData = (
  questionData: QuestionProviderType,
): { draft: FormProviderType; completed: FormProviderType } => ({
  draft: { ...formData, questions: [questionData] },
  completed: { ...formDataCompleted, questions: [questionData] },
});

export const { draft: draftFormQuestionsNullData } =
  questionsData(questionNullData);

export const {
  draft: draftFormQuestionsCheckboxData,
  completed: completedFormQuestionsCheckboxData,
} = questionsData(questionCheckboxData);

export const {
  draft: draftFormQuestionsDropdownData,
  completed: completedFormQuestionsDropdownData,
} = questionsData(questionDropdownData);

export const {
  draft: draftFormQuestionsRadioData,
  completed: completedFormQuestionsRadioData,
} = questionsData(questionRadioData);

export const {
  draft: draftFormQuestionsInputData,
  completed: completedFormQuestionsInputData,
} = questionsData(questionInputData);

const questionDataSchema = z
  .object({
    id: z.string().min(1),
    question: z.string().min(1),
    order: z.number(),
    type: z.nativeEnum(Type).nullable(),
    formId: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .array();

const AllQuestionProviders = ({
  children,
  store = allQuestionsData,
  questionStore = questionNullData,
  optionStore = checkboxOptionData,
}: {
  children?: ReactNode;
  store: FormProviderType;
  questionStore: QuestionProviderType;
  optionStore?: OptionProviderType;
}) => (
  <FormProvider store={store}>
    <QuestionProvider store={questionStore}>
      <OptionProvider store={optionStore}>{children}</OptionProvider>
    </QuestionProvider>
  </FormProvider>
);

export const AllQuestionTRPC = api.withTRPC(AllQuestionProviders);

export const FormDraftQuestionsCheckboxTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsCheckboxData,
    questionStore: { ...questionCheckboxData, index: 0 },
    optionStore: checkboxOptionData,
    ...props,
  }),
);

export const FormCompletedQuestionsCheckboxTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsCheckboxData,
    questionStore: questionCheckboxData,
    optionStore: checkboxOptionData,
    ...props,
  }),
);

export const FormDraftQuestionsDropdownTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsDropdownData,
    questionStore: questionDropdownData,
    optionStore: dropdownOptionData,
    ...props,
  }),
);

export const FormCompletedQuestionsDropdownTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsDropdownData,
    questionStore: questionDropdownData,
    optionStore: dropdownOptionData,
    ...props,
  }),
);

export const FormDraftQuestionsRadioTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsRadioData,
    questionStore: questionRadioData,
    ...props,
  }),
);

export const FormCompletedQuestionsRadioTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsRadioData,
    questionStore: questionRadioData,
    ...props,
  }),
);

export const FormDraftQuestionsInputTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsInputData,
    questionStore: questionInputData,
    ...props,
  }),
);

export const FormCompletedQuestionsInputTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsInputData,
    questionStore: questionInputData,
    ...props,
  }),
);

export const menuMapper = [
  { wrapper: AllQuestionTRPC, type: null, text: "Add" },
  {
    wrapper: FormDraftQuestionsCheckboxTRPC,
    type: "CHECKBOX",
    text: "Change to",
  },
  {
    wrapper: FormDraftQuestionsDropdownTRPC,
    type: "DROPDOWN",
    text: "Change to",
  },
  { wrapper: FormDraftQuestionsInputTRPC, type: "INPUT", text: "Change to" },
  { wrapper: FormDraftQuestionsRadioTRPC, type: "RADIO", text: "Change to" },
];

describe("Test the 'questionData'", () => {
  it("Should test all string data", () => {
    const { success } = questionDataSchema.safeParse([
      questionNullData,
      questionCheckboxData,
      questionDropdownData,
      questionRadioData,
      questionInputData,
    ]);
    expect(success).toEqual(true);
  });
});
