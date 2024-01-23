import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type { ReadAllInput, SearchAllInput } from "../schema/form.schema";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export const getLogsHandler = async ({
  input,
  session,
}: {
  input: ReadAllInput;
  session: Session;
}) => {
  try {
    const limit = 20;

    const userId = session.user.id;
    const { cursor, sort, order } = input;

    const sortObj = { [sort]: order };

    const orderBy = sort === "title" ? { form: sortObj } : sortObj;

    const logs = await prisma.submission.findMany({
      take: limit + 1,
      orderBy,
      where: { userId },
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        form: true,
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (logs.length > limit) {
      const nextItem = logs.pop();
      nextCursor = nextItem?.id;
    }

    if (!logs) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Log with that ID not found",
      });
    }

    return {
      status: "success",
      results: logs.length,
      nextCursor,
      data: {
        logs,
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

export const getSearchLogsHandler = async ({
  input,
  session,
}: {
  input: SearchAllInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const logs = await prisma.submission.findMany({
      take: 5,
      where: { userId, form: { title: { contains: input.title } } },
      include: {
        form: true,
      },
    });

    if (!logs) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "logs not found",
      });
    }

    return {
      status: "success",
      results: logs.length,
      data: {
        logs,
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
