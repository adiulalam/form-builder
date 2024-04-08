import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import type { ReadDashboardCardSchema } from "../schema/dashboard.schema";

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
        message: "Option with that ID not found",
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
