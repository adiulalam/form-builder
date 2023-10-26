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
import crypto from "crypto";

type Props = {
  children: ReactNode;
};

const questionData = (question: string, type: Type | null): Question => ({
  id: crypto.randomUUID(),
  question,
  type,
  order: 1,
  formId: "80bbdd42-4d13-410e-abb7-79b0c81e3d32",
  createdAt: new Date("2023-09-24T14:37:13.354Z"),
  updatedAt: new Date("2023-10-15T01:28:20.950Z"),
});

export const questionNullData = questionData("Null question", null);
export const questionCheckboxData = questionData(
  "Checkbox question",
  "CHECKBOX",
);
export const questionDropdownData = questionData(
  "Dropdown question",
  "DROPDOWN",
);
export const questionRadioData = questionData("Radio question", "RADIO");
export const questionInputData = questionData("Input question", "INPUT");

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

export const FormDraftQuestionsCheckboxTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsCheckboxData,
    questionStore: { ...questionCheckboxData, index: 0 },
    ...props,
  }),
);

export const FormCompletedQuestionsCheckboxTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsCheckboxData,
    questionStore: questionCheckboxData,
    ...props,
  }),
);

export const FormDraftQuestionsDropdownTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: draftFormQuestionsDropdownData,
    questionStore: questionDropdownData,
    ...props,
  }),
);

export const FormCompletedQuestionsDropdownTRPC = api.withTRPC((props: Props) =>
  AllQuestionProviders({
    store: completedFormQuestionsDropdownData,
    questionStore: questionDropdownData,
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
