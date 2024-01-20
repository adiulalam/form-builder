import type { Question, Form, Option, Submission } from "@prisma/client";

export type OptionProviderType = Option;
export type QuestionProviderType = Question & {
  options?: OptionProviderType[];
  index?: number;
};
export type FormProviderType = Form & {
  questions?: QuestionProviderType[];
};
export type LogProviderType = Submission & {
  form: Form;
};
