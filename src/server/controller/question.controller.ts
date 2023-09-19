import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type { CreateQuestionInput } from "../schema/question.schema";
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
