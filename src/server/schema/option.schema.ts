import { z, type TypeOf } from "zod";

export const createOptionSchema = z.object({
  value: z.string().min(1),
  questionId: z.string().uuid(),
});

export const params = z.object({
  id: z.string().uuid(),
});

export const createOrDeleteSchema = z.object({
  questionId: z.string().uuid(),
  isOtherOption: z.boolean(),
});

export type CreateOptionInput = TypeOf<typeof createOptionSchema>;
export type CreateOrDeleteInput = TypeOf<typeof createOrDeleteSchema>;
export type ParamsInput = TypeOf<typeof params>;
