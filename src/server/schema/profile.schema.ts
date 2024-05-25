import { Gender } from "@prisma/client";
import { z, type TypeOf } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string(),
    image: z.string().nullable(),
    dateOfBirth: z.date(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    phone: z.string().nullable(),
  })
  .strict();

export type UpdateProfileSchema = TypeOf<typeof updateProfileSchema>;
