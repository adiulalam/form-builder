import type { Prisma } from "@prisma/client";
import { Type } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateQuestionsType = Prisma.QuestionCreateManyInput[];

export const createQuestions = (
  formId: string,
  count: number
): CreateQuestionsType => {
  const questions: CreateQuestionsType = _.range(count).map((index) => ({
    formId,
    question: faker.lorem.sentence(6),
    order: index,
    type: faker.helpers.enumValue(Type),
  }));

  return questions;
};
