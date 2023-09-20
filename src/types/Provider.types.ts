import type { Question, Form, Option } from "@prisma/client";

export type OptionProviderType = { options?: Option[] };
export type QuestionProviderType = {
  questions?: (Question & OptionProviderType)[];
};
export type FormProviderType = Form & QuestionProviderType;
