import { TRPCError } from "@trpc/server";
import type { ParamsInput } from "../schema/form.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const getPostsHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const forms = await prisma.form.findMany({
      where: { userId: paramsInput.id },
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
