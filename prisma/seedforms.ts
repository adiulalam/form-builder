import { PrismaClient } from "@prisma/client";
import { createForms, createOptions, createQuestions } from "./create";

const prisma = new PrismaClient();

export const seedForms = async (userId: string) => {
  // Create 5 forms
  const forms = await prisma.$transaction(
    createForms(userId, 5).map((form) => prisma.form.create({ data: form }))
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

  return options;
};
