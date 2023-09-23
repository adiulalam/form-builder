import { Type } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const createQuestionSchema = z.object({
  order: z.number(),
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

export const updateQuestionOrderSchema = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  }),
);

export const updateQuestionTypeSchema = z.object({
  params,
  body: z.object({
    type: z.nativeEnum(Type),
  }),
});

export const updateQuestionShowInputSchema = z.object({
  params,
  body: z.object({
    showInput: z.boolean(),
  }),
});

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type UpdateQuestionOrderInput = TypeOf<typeof updateQuestionOrderSchema>;
export type UpdateQuestionTitleInput = TypeOf<
  typeof updateQuestionTitleSchema
>["body"];
export type UpdateQuestionTypeInput = TypeOf<
  typeof updateQuestionTypeSchema
>["body"];
export type UpdateQuestionShowInput = TypeOf<
  typeof updateQuestionShowInputSchema
>["body"];
