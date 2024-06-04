import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import dayjs from "dayjs";

type CreateSubmissionsType = Prisma.SubmissionCreateManyInput[];

export const createSubmissions = (
  formIds: string[],
  userId: string
): CreateSubmissionsType => {
  const createSubmissions: CreateSubmissionsType = formIds.map((formId) => ({
    formId,
    userId: userId,
    status: "COMPLETED",
    createdAt: faker.date.between({
      from: dayjs().startOf("year").toDate(),
      to: dayjs().endOf("year").toDate(),
    }),
  }));

  return createSubmissions;
};
