import type {
  Question,
  Form,
  Option,
  Submission,
  SubmissionOption,
} from "@prisma/client";

export type SubmissionOptionProviderType = SubmissionOption;
export type OptionProviderType = Option;
export type QuestionProviderType = Question & {
  options?: OptionProviderType[];
  submissionOptions?: SubmissionOptionProviderType[];
  index?: number;
};
export type FormProviderType = Form & {
  questions?: QuestionProviderType[];
};

export type SubmissionProviderType = Submission & {
  form: FormProviderType;
};

export type LogProviderType = Submission & {
  form: Form;
};
