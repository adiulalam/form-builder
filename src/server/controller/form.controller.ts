import { TRPCError } from "@trpc/server";
import type { SortByInput } from "../schema/form.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const getPostsHandler = async ({
  sortByInput,
}: {
  sortByInput: SortByInput;
}) => {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { [sortByInput.sort]: sortByInput.order },
      where: { userId: sortByInput.userId },
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
