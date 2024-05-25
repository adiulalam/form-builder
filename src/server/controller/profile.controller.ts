import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import type { UpdateProfileSchema } from "../schema/profile.schema";

export const getProfileHandler = async ({ session }: { session: Session }) => {
  try {
    const id = session.user.id;

    const result = await prisma.user.findFirstOrThrow({
      where: { id },
    });

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const updateProfileHandler = async ({
  input,
  session,
}: {
  input: UpdateProfileSchema;
  session: Session;
}) => {
  try {
    const id = session.user.id;

    const { dateOfBirth, gender, image, name, phone } = input;

    const result = await prisma.user.update({
      where: { id },
      data: {
        dateOfBirth,
        gender,
        image,
        name,
        phone,
      },
    });

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
