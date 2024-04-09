import { z, type TypeOf } from "zod";

const buttonNotOptionalSchema = z.object({
  button: z.string().min(1),
  link: z.string().min(1),
});

const buttonOptionalSchema = z.object({
  button: z.null(),
  link: z.null(),
});

const buttonSchema = z.union([buttonNotOptionalSchema, buttonOptionalSchema]);

const cardSchema = z.object({
  heading: z.string().min(1),
  value: z.union([z.string(), z.number()]),
});

const readDashboardCardSchema = z.intersection(cardSchema, buttonSchema);

export type ReadDashboardCardSchema = TypeOf<typeof readDashboardCardSchema>;
