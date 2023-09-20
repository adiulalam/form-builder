import { z, type TypeOf } from "zod";

export const createQuestionSchema = z.object({
  question: z.string().min(1),
  formId: z.string().uuid(),
});

export const params = z.object({
  id: z.string().uuid(),
});

export const updateQuestionTitleSchema = z.object({
  params,
  body: z.object({
    question: z.string().min(1),
  }),
});

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type UpdateQuestionTitleInput = TypeOf<
  typeof updateQuestionTitleSchema
>["body"];
