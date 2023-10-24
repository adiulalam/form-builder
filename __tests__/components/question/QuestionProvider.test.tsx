import type { ReactNode } from "react";
import { Type, type Question } from "@prisma/client";
import { FormProvider, QuestionProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";
import type {
  FormProviderType,
  QuestionProviderType,
} from "@/types/Provider.types";
import { formData, formDataCompleted } from "../form";

type Props = {
  children: ReactNode;
};

export const questionNullData: Question = {
  id: "d81bd283-704f-43b1-aacc-108cedb2f07a",
  question: "Null question",
  order: 1,
  type: null,
  formId: "95090744-152b-48ee-9eb6-a36245945686",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
};

export const questionCheckboxData: Question = {
  id: "d81bd283-704f-43b1-aacc-108cedb2f07b",
  question: "Checkbox question",
  order: 1,
  type: "CHECKBOX",
  formId: "95090744-152b-48ee-9eb6-a36245945686",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
};

export const questionDropdownData: Question = {
  id: "d81bd283-704f-43b1-aacc-108cedb2f07c",
  question: "Dropdown question",
  order: 1,
  type: "DROPDOWN",
  formId: "95090744-152b-48ee-9eb6-a36245945686",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
};

export const questionRadioData: Question = {
  id: "d81bd283-704f-43b1-aacc-108cedb2f07d",
  question: "Radio question",
  order: 1,
  type: "RADIO",
  formId: "95090744-152b-48ee-9eb6-a36245945686",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
};

export const questionInputData: Question = {
  id: "d81bd283-704f-43b1-aacc-108cedb2f07E",
  question: "Input question",
  order: 1,
  type: "INPUT",
  formId: "95090744-152b-48ee-9eb6-a36245945686",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
};

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

export const draftFormQuestionsNullData: FormProviderType = {
  ...formData,
  questions: [questionNullData],
};

export const draftFormQuestionsCheckboxData: FormProviderType = {
  ...formData,
  questions: [questionCheckboxData],
};

export const completedFormQuestionsCheckboxData: FormProviderType = {
  ...formDataCompleted,
  questions: [questionCheckboxData],
};

export const draftFormQuestionsDropdownData: FormProviderType = {
  ...formData,
  questions: [questionDropdownData],
};

export const completedFormQuestionsDropdownData: FormProviderType = {
  ...formDataCompleted,
  questions: [questionDropdownData],
};

export const draftFormQuestionsRadioData: FormProviderType = {
  ...formData,
  questions: [questionRadioData],
};

export const completedFormQuestionsRadioData: FormProviderType = {
  ...formDataCompleted,
  questions: [questionRadioData],
};

export const draftFormQuestionsInputData: FormProviderType = {
  ...formData,
  questions: [questionInputData],
};

export const completedFormQuestionsInputData: FormProviderType = {
  ...formDataCompleted,
  questions: [questionInputData],
};

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
}: {
  children?: ReactNode;
  store: FormProviderType;
  questionStore: QuestionProviderType;
}) => (
  <FormProvider store={store}>
    <QuestionProvider store={questionStore}>{children}</QuestionProvider>
  </FormProvider>
);

export const AllQuestionTRPC = api.withTRPC(AllQuestionProviders);

export const FormDraftQuestionsCheckbox = (props: Props) => (
  <AllQuestionProviders
    store={draftFormQuestionsCheckboxData}
    questionStore={{ ...questionCheckboxData, index: 0 }}
    {...props}
  />
);

export const FormDraftQuestionsCheckboxTRPC = api.withTRPC(
  FormDraftQuestionsCheckbox,
);

const FormCompletedQuestionsCheckbox = (props: Props) => (
  <AllQuestionProviders
    store={completedFormQuestionsCheckboxData}
    questionStore={questionCheckboxData}
    {...props}
  />
);

export const FormCompletedQuestionsCheckboxTRPC = api.withTRPC(
  FormCompletedQuestionsCheckbox,
);

const FormDraftQuestionsDropdown = (props: Props) => (
  <AllQuestionProviders
    store={draftFormQuestionsDropdownData}
    questionStore={questionDropdownData}
    {...props}
  />
);

export const FormDraftQuestionsDropdownTRPC = api.withTRPC(
  FormDraftQuestionsDropdown,
);

const FormCompletedQuestionsDropdown = (props: Props) => (
  <AllQuestionProviders
    store={completedFormQuestionsDropdownData}
    questionStore={questionDropdownData}
    {...props}
  />
);

export const FormCompletedQuestionsDropdownTRPC = api.withTRPC(
  FormCompletedQuestionsDropdown,
);

const FormDraftQuestionsRadio = (props: Props) => (
  <AllQuestionProviders
    store={draftFormQuestionsRadioData}
    questionStore={questionRadioData}
    {...props}
  />
);

export const FormDraftQuestionsRadioTRPC = api.withTRPC(
  FormDraftQuestionsRadio,
);

const FormCompletedQuestionsRadio = (props: Props) => (
  <AllQuestionProviders
    store={completedFormQuestionsRadioData}
    questionStore={questionRadioData}
    {...props}
  />
);

export const FormCompletedQuestionsRadioTRPC = api.withTRPC(
  FormCompletedQuestionsRadio,
);

const FormDraftQuestionsInput = (props: Props) => (
  <AllQuestionProviders
    store={draftFormQuestionsInputData}
    questionStore={questionInputData}
    {...props}
  />
);

export const FormDraftQuestionsInputTRPC = api.withTRPC(
  FormDraftQuestionsInput,
);

const FormCompletedQuestionsInput = (props: Props) => (
  <AllQuestionProviders
    store={completedFormQuestionsInputData}
    questionStore={questionInputData}
    {...props}
  />
);

export const FormCompletedQuestionsInputTRPC = api.withTRPC(
  FormCompletedQuestionsInput,
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
