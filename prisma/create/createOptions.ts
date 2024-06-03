import type { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateOptionsType = Prisma.OptionCreateManyInput[];

export const createOptions = (
  questionId: string,
  showInput: boolean,
  count: number
): CreateOptionsType => {
  const options: CreateOptionsType = _.range(count).map(() => ({
    questionId,
    showInput,
    value: faker.word.sample(),
  }));

  return options;
};
