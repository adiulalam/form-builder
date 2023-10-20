import type { ReactNode } from "react";
import { Type, type Question } from "@prisma/client";
import { FormProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";
import type { FormProviderType } from "@/types/Provider.types";
import { formData, formDataCompleted } from "../form";

type Props = {
  children: ReactNode;
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

export const questionInputoData: Question = {
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
    questionCheckboxData,
    questionDropdownData,
    questionRadioData,
    questionInputoData,
  ],
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
  questions: [questionInputoData],
};

export const completedFormQuestionsInputData: FormProviderType = {
  ...formDataCompleted,
  questions: [questionInputoData],
};

const questionDataSchema = z
  .object({
    id: z.string().min(1),
    question: z.string().min(1),
    order: z.number(),
    type: z.nativeEnum(Type),
    formId: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .array();

const AllQuestionProviders = ({
  children,
  store = allQuestionsData,
}: {
  children?: ReactNode;
  store: FormProviderType;
}) => <FormProvider store={store}>{children}</FormProvider>;

export const AllQuestionTRPC = api.withTRPC(AllQuestionProviders);

const FormDraftQuestionsCheckbox = (props: Props) => (
  <AllQuestionProviders store={draftFormQuestionsCheckboxData} {...props} />
);

export const FormDraftQuestionsCheckboxTRPC = api.withTRPC(
  FormDraftQuestionsCheckbox,
);

const FormCompletedQuestionsCheckbox = (props: Props) => (
  <AllQuestionProviders store={completedFormQuestionsCheckboxData} {...props} />
);

export const FormCompletedQuestionsCheckboxTRPC = api.withTRPC(
  FormCompletedQuestionsCheckbox,
);

const FormDraftQuestionsDropdown = (props: Props) => (
  <AllQuestionProviders store={draftFormQuestionsDropdownData} {...props} />
);

export const FormDraftQuestionsDropdownTRPC = api.withTRPC(
  FormDraftQuestionsDropdown,
);

const FormCompletedQuestionsDropdown = (props: Props) => (
  <AllQuestionProviders store={completedFormQuestionsDropdownData} {...props} />
);

export const FormCompletedQuestionsDropdownTRPC = api.withTRPC(
  FormCompletedQuestionsDropdown,
);

const FormDraftQuestionsRadio = (props: Props) => (
  <AllQuestionProviders store={draftFormQuestionsRadioData} {...props} />
);

export const FormDraftQuestionsRadioTRPC = api.withTRPC(
  FormDraftQuestionsRadio,
);

const FormCompletedQuestionsRadio = (props: Props) => (
  <AllQuestionProviders store={completedFormQuestionsRadioData} {...props} />
);

export const FormCompletedQuestionsRadioTRPC = api.withTRPC(
  FormCompletedQuestionsRadio,
);

const FormDraftQuestionsInput = (props: Props) => (
  <AllQuestionProviders store={draftFormQuestionsInputData} {...props} />
);

export const FormDraftQuestionsInputTRPC = api.withTRPC(
  FormDraftQuestionsInput,
);

const FormCompletedQuestionsInput = (props: Props) => (
  <AllQuestionProviders store={completedFormQuestionsInputData} {...props} />
);

export const FormCompletedQuestionsInputTRPC = api.withTRPC(
  FormCompletedQuestionsInput,
);

describe("Test the 'questionData'", () => {
  it("Should test all string data", () => {
    const { success } = questionDataSchema.safeParse([
      questionCheckboxData,
      questionDropdownData,
      questionRadioData,
      questionInputoData,
    ]);
    expect(success).toEqual(true);
  });
});
