import type { Option, Prisma, Question } from "@prisma/client";

type CreateSubmissionsType = Prisma.SubmissionCreateManyInput[];

export const createSubmissions = (
  options: (Option & { question: Question })[],
  userId: string
): CreateSubmissionsType => {
  const createSubmissions: CreateSubmissionsType = options.map((option) => ({
    formId: option.question.formId,
    userId: userId,
    status: "COMPLETED",
  }));

  return createSubmissions;
};
