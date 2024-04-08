import { z } from "zod";
import { type TypeOf } from "zod";

export const readDashboardCardSchema = z.object({
  heading: z.string().min(1),
  button: z.string().nullable(),
  link: z.string().nullable(),
  value: z.number(),
});

export type ReadDashboardCardSchema = TypeOf<typeof readDashboardCardSchema>;
