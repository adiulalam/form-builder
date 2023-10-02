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

    const questionUser = prisma.question.findFirstOrThrow({
      where: {
        id: input.questionId,
        form: {
          userId,
        },
      },
      select: { id: true },
    });

    const createOption = prisma.option.create({
      data: input,
    });

    const result = await prisma.$transaction([questionUser, createOption]);

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Option with that ID not found",
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

export const createOrDeleteIsOtherOptionHandler = async ({
  input,
  session,
}: {
  input: CreateOrDeleteInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const questionUser = prisma.question.findFirstOrThrow({
      where: {
        id: input.questionId,
        form: {
          userId,
        },
      },
    });

    const deleteOptions = prisma.option.deleteMany({
      where: {
        isOtherOption: true,
        questionId: input.questionId,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    const createOption = prisma.option.create({
      data: {
        value: "OTHER",
        questionId: input.questionId,
        isOtherOption: true,
        showInput: true,
      },
    });

    if (input.isOtherOption) {
      const result = await prisma.$transaction([questionUser, deleteOptions]);

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Option with that ID not found",
        });
      }

      return {
        status: "success",
        data: {
          result,
        },
      };
    } else {
      const result = await prisma.$transaction([questionUser, createOption]);

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Option with that ID not found",
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
