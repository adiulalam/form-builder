import type { Prisma } from "@prisma/client";
import { Status } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateFormType = Prisma.FormUncheckedCreateInput[];

export const createForms = (userId: string, count: number): CreateFormType => {
  const forms: CreateFormType = _.range(count).map(() => ({
    title: faker.lorem.sentence(3),
    status: faker.helpers.enumValue(Status),
    userId,
  }));

  return forms;
};
