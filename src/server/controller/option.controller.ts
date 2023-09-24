import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type {
  CreateOptionInput,
  CreateOrDeleteInput,
  ParamsInput,
} from "../schema/option.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const createOptionHandler = async ({
  input,
  session,
}: {
  input: CreateOptionInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    await prisma.question.findFirstOrThrow({
      where: {
        id: input.questionId,
        form: {
          userId,
        },
      },
    });

    const data = {
      ...input,
    };

    const option = await prisma.option.create({
      data,
    });

    if (!option) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Option with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        option,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Option with that id already exists",
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

export const createOrDeleteOptionHandler = async ({
  input,
  session,
}: {
  input: CreateOrDeleteInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    await prisma.question.findFirstOrThrow({
      where: {
        id: input.questionId,
        form: {
          userId,
        },
      },
    });

    if (input.isOtherOption) {
      const option = await prisma.option.deleteMany({
        where: {
          value: "Other:",
          showInput: true,
          questionId: input.questionId,
          question: {
            form: {
              userId,
            },
          },
        },
      });

      if (!option) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Option with that ID not found",
        });
      }

      return {
        status: "success",
        data: {
          option,
        },
      };
    } else {
      const option = await prisma.option.create({
        data: {
          value: "Other:",
          questionId: input.questionId,
          showInput: true,
        },
      });

      if (!option) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Option with that ID not found",
        });
      }

      return {
        status: "success",
        data: {
          option,
        },
      };
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Option with that id already exists",
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

export const deleteOptionHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const option = await prisma.option.delete({
      where: {
        id: input.id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (!option) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Option with that ID not found",
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

export const deleteAllOptionsHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const option = await prisma.option.deleteMany({
      where: {
        questionId: input.id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (!option) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Option with that ID not found",
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
