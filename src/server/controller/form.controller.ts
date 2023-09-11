import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type {
  CreateFormInput,
  ParamsInput,
  ReadAllInput,
  UpdateFormFavouriteInput,
} from "../schema/form.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const getFormsHandler = async ({
  input,
  session,
}: {
  input: ReadAllInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const forms = await prisma.form.findMany({
      orderBy: { [input.sort]: input.order },
      where: { userId },
    });

    if (!forms) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form with that ID not found",
      });
    }

    return {
      status: "success",
      results: forms.length,
      data: {
        forms,
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

export const createFormHandler = async ({
  input,
  session,
}: {
  input: CreateFormInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const data = {
      ...input,
      userId,
    };

    const form = await prisma.form.create({
      data,
    });

    if (!form) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        form,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Form with that id already exists",
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

export const updateFormFavouriteHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateFormFavouriteInput;
  session: Session;
  paramsInput: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const form = await prisma.form.update({
      where: {
        id: paramsInput.id,
        userId,
      },
      data: input,
    });

    if (!form) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        form,
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

export const deleteFormHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const form = await prisma.form.delete({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!form) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form with that ID not found",
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
