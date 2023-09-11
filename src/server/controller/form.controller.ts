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

    const post = await prisma.form.create({
      data,
    });

    return {
      status: "success",
      data: {
        post,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Form with that title already exists",
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

    const post = await prisma.form.update({
      where: {
        id: paramsInput.id,
        userId,
      },
      data: input,
    });

    return {
      status: "success",
      data: {
        post,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Form with that title already exists",
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
