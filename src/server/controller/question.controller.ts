import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type {
  CreateQuestionInput,
  ParamsInput,
  UpdateQuestionOrderInput,
  UpdateQuestionTitleInput,
} from "../schema/question.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const createQuestionHandler = async ({
  input,
  session,
}: {
  input: CreateQuestionInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    await prisma.form.findFirstOrThrow({
      where: {
        id: input.formId,
        userId,
      },
    });

    const data = {
      ...input,
    };

    const question = await prisma.question.create({
      data,
    });

    if (!question) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        question,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Question with that id already exists",
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const updateQuestionTitleHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateQuestionTitleInput;
  session: Session;
  paramsInput: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const question = await prisma.question.update({
      where: {
        id: paramsInput.id,
        form: {
          userId,
        },
      },
      data: input,
    });

    if (!question) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        question,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const updateQuestionOrderHandler = async ({
  input,
  session,
}: {
  input: UpdateQuestionOrderInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const result = await prisma.$transaction(
      input.map(({ id, order }) =>
        prisma.question.update({
          where: {
            id,
            form: {
              userId,
            },
          },
          data: {
            order,
          },
        }),
      ),
    );

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        result,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
