import { Status } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const createFormSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});

export const readAllSchema = z.object({
  sort: z.string({
    required_error: "Sort key is required",
  }),
  order: z.enum(["asc", "desc"], {
    required_error: "Order key is required",
  }),
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
      title: z.string(),
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

export type CreateFormInput = TypeOf<typeof createFormSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type ReadAllInput = TypeOf<typeof readAllSchema>;
export type SearchAllInput = TypeOf<typeof searchAllSchema>;
export type UpdateFormInput = TypeOf<typeof updateFormSchema>["body"];
export type UpdateFormFavouriteInput = TypeOf<
  typeof updateFormFavouriteSchema
>["body"];
