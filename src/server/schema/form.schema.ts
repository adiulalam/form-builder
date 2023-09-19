import { Status } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const createFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1),
});

export const readAllSchema = z.object({
  sort: z.string({
    required_error: "Sort key is required",
  }),
  order: z.enum(["asc", "desc"], {
    required_error: "Order key is required",
  }),
  cursor: z.string().nullish(),
});

export const searchAllSchema = z.object({
  title: z.string().optional(),
});

export const params = z.object({
  id: z.string().uuid(),
});

export const updateFormSchema = z.object({
  params,
  body: z
    .object({
      title: z.string().min(1),
      status: z.nativeEnum(Status),
    })
    .partial(),
});

export const updateFormFavouriteSchema = z.object({
  params,
  body: z.object({
    isFavourite: z.boolean(),
  }),
});

export const updateFormShareSchema = z.object({
  params,
  body: z.object({
    isShareable: z.boolean(),
  }),
});

export const updateFormStatusSchema = z.object({
  params,
  body: z.object({
    status: z.nativeEnum(Status),
  }),
});

export const updateFormTitleSchema = z.object({
  params,
  body: z.object({
    title: z.string().min(1),
  }),
});

export type CreateFormInput = TypeOf<typeof createFormSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type ReadAllInput = TypeOf<typeof readAllSchema>;
export type SearchAllInput = TypeOf<typeof searchAllSchema>;
export type UpdateFormInput = TypeOf<typeof updateFormSchema>["body"];
export type UpdateFormTitleInput = TypeOf<typeof updateFormTitleSchema>["body"];
export type UpdateFormStatusInput = TypeOf<
  typeof updateFormStatusSchema
>["body"];
export type UpdateFormFavouriteInput = TypeOf<
  typeof updateFormFavouriteSchema
>["body"];
export type UpdateFormShareInput = TypeOf<typeof updateFormShareSchema>["body"];
