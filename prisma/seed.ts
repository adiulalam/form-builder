import type { Prisma } from "@prisma/client";
import { PrismaClient, Status, Type } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateFormType = Prisma.FormUncheckedCreateInput[];
type CreateQuestionsType = Prisma.QuestionCreateManyInput[];
type CreateOptionsType = Prisma.OptionCreateManyInput[];

const prisma = new PrismaClient();

const createOptions = (
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

const createQuestions = (
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

const createForms = (userId: string, count: number): CreateFormType => {
  const forms: CreateFormType = _.range(count).map(() => ({
    title: faker.lorem.sentence(3),
    status: faker.helpers.enumValue(Status),
    userId,
  }));

  return forms;
};

const main = async () => {
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!user) return new Error("No user id found");

  // Create 5 forms
  const forms = await prisma.$transaction(
    createForms(user.id, 5).map((form) => prisma.form.create({ data: form }))
  );
  console.log("Forms Created");

  // Each forms has 5 questions
  const formsQuestions = forms.flatMap((form) =>
    createQuestions(form.id, 5).map((question) =>
      prisma.question.create({ data: question })
    )
  );
  const questions = await prisma.$transaction(formsQuestions);
  console.log("Questions Created");

  // Each questions has 5 options, except type input
  const questionsOptions = questions.flatMap((question) =>
    createOptions(
      question.id,
      question.type === "INPUT",
      question.type === "INPUT" ? 1 : 5
    ).map((option) => prisma.option.create({ data: option }))
  );

  const options = await prisma.$transaction(questionsOptions);
  console.log("Options Created", options);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
