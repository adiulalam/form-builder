import { z, type TypeOf } from "zod";

export const createOptionSchema = z.object({
  value: z.string().min(1),
  questionId: z.string().uuid(),
});

export const params = z.object({
  id: z.string().uuid(),
});

export type CreateOptionInput = TypeOf<typeof createOptionSchema>;
export type ParamsInput = TypeOf<typeof params>;
