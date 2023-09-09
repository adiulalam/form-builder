import { Status } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const createFormSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  status: z.nativeEnum(Status, {
    required_error: "Status is required",
  }),
  userId: z
    .string({
      required_error: "Category is required",
    })
    .uuid(),
});

export const sortByParams = z.object({
  id: z.string().uuid(),
  sort: z.string({
    required_error: "Sort key is required",
  }),
  order: z.enum(["asc", "desc"], {
    required_error: "Order key is required",
  }),
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

export type CreateFormInput = TypeOf<typeof createFormSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type SortByInput = TypeOf<typeof sortByParams>;
export type UpdateFormInput = TypeOf<typeof updateFormSchema>["body"];
