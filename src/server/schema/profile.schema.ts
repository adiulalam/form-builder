import { Gender } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string(),
    image: z.string().nullable(),
    dateOfBirth: z.string().nullable().or(z.date()),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).nullable(),
    phone: z.string().nullable(),
  })
  .strict();

export type UpdateProfileSchema = TypeOf<typeof updateProfileSchema>;
