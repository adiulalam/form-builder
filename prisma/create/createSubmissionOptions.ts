import { faker } from "@faker-js/faker";
import type { Option, Prisma, Question, Submission } from "@prisma/client";

type CreateSubmissionOptionsType = Prisma.SubmissionOptionCreateManyInput[];

export const createSubmissionsOptions = (
  options: (Option & { question: Question })[],
  submissions: Submission[]
): CreateSubmissionOptionsType => {
  const createSubmissionOptions: CreateSubmissionOptionsType =
    submissions.flatMap((submission) =>
      options.map((option) => ({
        submissionId: submission.id,
        optionId: option.id,
        questionId: option.questionId,
        inputText:
          option.question.type === "INPUT" ? faker.word.sample() : null,
      }))
    );

  return createSubmissionOptions;
};
