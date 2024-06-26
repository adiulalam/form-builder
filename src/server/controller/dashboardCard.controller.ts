import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import type { ReadDashboardCardSchema } from "../schema/dashboard.schema";
import { roundIfNessesary } from "@/utils/helperFunctions";

export const getDashboardFormCardHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const allForms = prisma.form.count({
      where: {
        userId,
      },
    });

    const allDraftForms = prisma.form.count({
      where: {
        userId,
        status: "DRAFT",
      },
    });

    const allCompletedForms = prisma.form.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    });

    const allSubmittedForms = prisma.submission.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    });

    const result = await prisma.$transaction([
      allForms,
      allDraftForms,
      allCompletedForms,
      allSubmittedForms,
    ]);

    const data: ReadDashboardCardSchema[] = [
      {
        heading: "Total Forms Created",
        button: "See All Forms",
        value: result[0],
        link: "/forms",
      },
      {
        heading: "Total Draft Forms",
        button: "See Draft Forms",
        value: result[1],
        link: "/forms?sort=status&order=asc",
      },
      {
        heading: "Total Completed Forms",
        button: "See completed Forms",
        value: result[2],
        link: "/forms?sort=status&order=desc",
      },
      {
        heading: "Total Forms Submitted",
        button: "See Submitted Forms",
        value: result[3],
        link: "/logs?sort=status&order=desc",
      },
    ];

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Dashboard data not found",
      });
    }

    return {
      status: "success",
      data: {
        result: data,
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

export const getDashboardQuestionCardHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const allForms = prisma.form.count({
      where: {
        userId,
      },
    });

    const allQuestions = prisma.question.count({
      where: {
        form: {
          userId,
        },
      },
    });

    const result = await prisma.$transaction([allForms, allQuestions]);

    const avgQuestions = roundIfNessesary(result[1] / result[0]);

    const data: ReadDashboardCardSchema[] = [
      {
        heading: "Total questions created",
        button: null,
        value: result[1],
        link: null,
      },
      {
        heading: "Average questions per form",
        button: null,
        value: avgQuestions,
        link: null,
      },
    ];

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Dashboard data not found",
      });
    }

    return {
      status: "success",
      data: {
        result: data,
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

export const getDashboardAnswerCardHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const allQuestions = prisma.question.count({
      where: {
        form: {
          userId,
        },
      },
    });

    const allAnswers = prisma.option.count({
      where: {
        question: {
          form: {
            userId,
          },
        },
      },
    });

    const result = await prisma.$transaction([allQuestions, allAnswers]);

    const avgAnswers = roundIfNessesary(result[1] / result[0]);

    const data: ReadDashboardCardSchema[] = [
      {
        heading: "Total answers created",
        button: null,
        value: result[1],
        link: null,
      },
      {
        heading: "Average answers per question",
        button: null,
        value: avgAnswers,
        link: null,
      },
    ];

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Dashboard data not found",
      });
    }

    return {
      status: "success",
      data: {
        result: data,
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
