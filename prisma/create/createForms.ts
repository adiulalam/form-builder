import type { Prisma } from "@prisma/client";
import { Status } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateFormType = Prisma.FormUncheckedCreateInput[];

export const createForms = (userId: string, count: number): CreateFormType => {
  const status = faker.helpers.enumValue(Status);

  const forms: CreateFormType = _.range(count).map(() => ({
    status,
    title: faker.lorem.sentence(3),
    isShareable: status === "COMPLETED",
    userId,
  }));

  return forms;
};
