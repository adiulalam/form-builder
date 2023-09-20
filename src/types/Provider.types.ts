import type { Question, Form, Option } from "@prisma/client";

export type OptionProviderType = Option;
export type QuestionProviderType = Question & {
  options?: OptionProviderType[];
  index?: number;
};
export type FormProviderType = Form & {
  questions?: QuestionProviderType[];
};
