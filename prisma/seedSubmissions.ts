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

  const submissions = await prisma.$transaction(
    createSubmissions(options, userId).map((submission) =>
      prisma.submission.create({ data: submission })
    )
  );

  const submissionOptions = await prisma.$transaction(
    createSubmissionsOptions(options, submissions).map((submissionOption) =>
      prisma.submissionOption.create({ data: submissionOption })
    )
  );
  console.log("🚀 ~ submissionOptions ~ submissions:", submissionOptions);
};
