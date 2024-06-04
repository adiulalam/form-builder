import { PrismaClient } from "@prisma/client";
import { createForms, createOptions, createQuestions } from "./create";

const prisma = new PrismaClient();

const limit = { form: 5, question: 5, option: 5 };

export const seedForms = async (userId: string) => {
  // Create X forms
  const forms = await prisma.$transaction(
    createForms(userId, limit.form).map((form) =>
      prisma.form.create({ data: form })
    )
  );
  console.log("Forms Created");

  // Each forms has X questions
  const formsQuestions = forms.flatMap((form) =>
    createQuestions(form.id, limit.question).map((question) =>
      prisma.question.create({ data: question })
    )
  );
  const questions = await prisma.$transaction(formsQuestions);
  console.log("Questions Created");

  // Each questions has X options, except type input
  const questionsOptions = questions.flatMap((question) =>
    createOptions(
      question.id,
      question.type === "INPUT",
      question.type === "INPUT" ? 1 : limit.option
    ).map((option) => prisma.option.create({ data: option }))
  );

  const options = await prisma.$transaction(questionsOptions);
  console.log("Options Created", options.length);

  return options;
};
