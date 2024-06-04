import { PrismaClient } from "@prisma/client";
import { createSubmissions, createSubmissionsOptions } from "./create";

const prisma = new PrismaClient();

export const seedSubmissions = async (userId: string, optionIds: string[]) => {
  const options = await prisma.option.findMany({
    where: {
      id: { in: optionIds },
      question: { form: { status: "COMPLETED", userId } },
    },
    distinct: "questionId",
    include: { question: true },
  });

  const formIds = options.map((option) => option.question.formId);

  const submissions = await prisma.$transaction(
    createSubmissions(formIds, userId).map((submission) =>
      prisma.submission.create({ data: submission })
    )
  );
  console.log("Submissions Created");

  const minimialOptions = options.map((option) => ({
    id: option.id,
    questionId: option.question.id,
    questionType: option.question.type,
  }));

  const submissionIds = submissions.map((submission) => submission.id);

  const submissionOptions = await prisma.$transaction(
    createSubmissionsOptions(minimialOptions, submissionIds).map(
      (submissionOption) =>
        prisma.submissionOption.create({ data: submissionOption })
    )
  );
  console.log("Submission Options Created");

  console.log("Options Created", submissionOptions.length);
};
