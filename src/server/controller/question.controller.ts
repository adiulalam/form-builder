import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type {
  CreateQuestionInput,
  ParamsInput,
  UpdateQuestionOrderInput,
  UpdateQuestionTitleInput,
  UpdateQuestionTypeInput,
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

    const formUser = prisma.form.findFirstOrThrow({
      where: {
        id: input.formId,
        userId,
      },
      select: { id: true },
    });

    const createQuestion = prisma.question.create({
      data: input,
    });

    const result = await prisma.$transaction([formUser, createQuestion]);

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

export const updateQuestionTypeHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateQuestionTypeInput;
  session: Session;
  paramsInput: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const updateQuestion = prisma.question.update({
      where: {
        id: paramsInput.id,
        form: {
          userId,
        },
      },
      data: input,
    });

    const deleteOthers = prisma.option.deleteMany({
      where: {
        value: "Other:",
        showInput: true,
        questionId: paramsInput.id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    const createInput = prisma.option.create({
      data: {
        value: "Input",
        questionId: paramsInput.id,
        showInput: true,
      },
    });

    const deleteInputs = prisma.option.deleteMany({
      where: {
        value: "Input",
        showInput: true,
        questionId: paramsInput.id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (input.type === "INPUT") {
      const result = await prisma.$transaction([
        updateQuestion,
        deleteOthers,
        createInput,
      ]);

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
    } else {
      const result = await prisma.$transaction([updateQuestion, deleteInputs]);

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
    }
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

export const deleteQuestionHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const question = await prisma.question.delete({
      where: {
        id: input.id,
        form: { userId },
      },
    });

    if (!question) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return {
      status: "success",
      data: null,
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
