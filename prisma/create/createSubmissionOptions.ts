import { faker } from "@faker-js/faker";
import type { Prisma, Type } from "@prisma/client";

type CreateSubmissionOptionsType = Prisma.SubmissionOptionCreateManyInput[];

type Options = {
  id: string;
  questionId: string;
  questionType: Type | null;
}[];

export const createSubmissionsOptions = (
  options: Options,
  submissionIds: string[]
): CreateSubmissionOptionsType => {
  const createSubmissionOptions: CreateSubmissionOptionsType = options.map(
    (option, index) => ({
      submissionId: submissionIds[index]!,
      optionId: option.id,
      questionId: option.questionId,
      inputText: option.questionType === "INPUT" ? faker.word.sample() : null,
    })
  );

  return createSubmissionOptions;
};
