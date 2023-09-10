import { TRPCError } from "@trpc/server";
import type { CreateFormInput, SortByInput } from "../schema/form.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const getFormsHandler = async ({ input }: { input: SortByInput }) => {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { [input.sort]: input.order },
      where: { userId: input.userId },
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
}: {
  input: CreateFormInput;
}) => {
  try {
    const post = await prisma.form.create({
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
