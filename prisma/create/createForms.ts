import type { Prisma } from "@prisma/client";
import { Status } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import dayjs from "dayjs";

type CreateFormType = Prisma.FormUncheckedCreateInput[];

export const createForms = (userId: string, count: number): CreateFormType => {
  const forms: CreateFormType = _.range(count).map(() => {
    const status = faker.helpers.enumValue(Status);

    return {
      status,
      title: faker.lorem.sentence(3),
      isShareable: status === "COMPLETED",
      userId,
      createdAt: faker.date.between({
        from: dayjs().startOf("year").toDate(),
        to: dayjs().endOf("year").toDate(),
      }),
    };
  });

  return forms;
};
