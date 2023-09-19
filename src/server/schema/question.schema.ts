import { z, type TypeOf } from "zod";

export const createQuestionSchema = z.object({
  question: z.string().min(1),
  formId: z.string().uuid(),
});

export const params = z.object({
  id: z.string().uuid(),
});

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>;
