import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import type {
  CreateFormInput,
  ParamsInput,
  ReadAllInput,
  SearchAllInput,
  SubmitFormInput,
  UpdateFormFavouriteInput,
  UpdateFormShareInput,
  UpdateFormStatusInput,
  UpdateFormTitleInput,
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
    const limit = 20;

    const userId = session.user.id;
    const { cursor, sort, order } = input;

    const forms = await prisma.form.findMany({
      take: limit + 1,
      orderBy: { [sort]: order },
      where: { userId },
      cursor: cursor ? { id: cursor } : undefined,
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (forms.length > limit) {
      const nextItem = forms.pop();
      nextCursor = nextItem?.id;
    }

    if (!forms) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form with that ID not found",
      });
    }

    return {
      status: "success",
      results: forms.length,
      nextCursor,
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

export const getPrivateFormHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const form = await prisma.form.findFirstOrThrow({
      where: {
        id: input.id,
        userId,
      },
      include: {
        questions: {
          orderBy: [
            {
              order: "asc",
            },
            {
              updatedAt: "asc",
            },
          ],
          include: {
            options: {
              orderBy: [
                {
                  updatedAt: "asc",
                },
              ],
            },
          },
        },
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

export const getPublicFormHandler = async ({
  input,
  session,
}: {
  input: ParamsInput;
  session: Session;
}) => {
  try {
    const getFormPermission = prisma.form.findFirstOrThrow({
      where: { id: input.id, isShareable: true },
    });

    const getSubmissionForm = prisma.submission.findFirst({
      where: {
        formId: input.id,
        userId: session.user.id,
        form: { isShareable: true },
      },
      include: {
        form: {
          include: {
            questions: {
              orderBy: [
                {
                  order: "asc",
                },
                {
                  updatedAt: "asc",
                },
              ],
              include: {
                submissionOptions: {
                  where: {
                    submission: {
                      formId: input.id,
                      userId: session.user.id,
                      form: { isShareable: true },
                    },
                  },
                },
                options: {
                  orderBy: [
                    {
                      isOtherOption: "asc",
                    },
                    {
                      updatedAt: "asc",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });

    const createSubmissionForm = prisma.submission.create({
      data: {
        userId: session.user.id,
        formId: input.id,
      },
    });

    const [, submissionForm] = await prisma.$transaction([
      getFormPermission,
      getSubmissionForm,
    ]);

    if (submissionForm) {
      return {
        status: "success",
        data: {
          submissionForm,
        },
      };
    }

    const [, newSubmissionForm] = await prisma.$transaction([
      createSubmissionForm,
      getSubmissionForm,
    ]);

    if (!newSubmissionForm) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to create shareable form",
      });
    }

    return {
      status: "success",
      data: {
        submissionForm: newSubmissionForm,
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

export const getSearchFormsHandler = async ({
  input,
  session,
}: {
  input: SearchAllInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const forms = await prisma.form.findMany({
      take: 5,
      where: { userId, title: { contains: input.title } },
    });

    if (!forms) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Forms not found",
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

export const submitFormHandler = async ({
  input,
  session,
}: {
  input: SubmitFormInput;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const { formId, submissionId, submissionOptions } = input;

    const submissionCount = await prisma.submission.count({
      where: {
        userId,
        formId,
        id: submissionId,
        status: { not: "DRAFT" },
      },
    });

    if (submissionCount > 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Form has already been submitted",
      });
    }

    const submission = await prisma.submission.update({
      where: {
        userId,
        formId,
        id: submissionId,
      },
      data: {
        status: "COMPLETED",
        submissionOptions: {
          createMany: {
            data: submissionOptions,
          },
        },
      },
    });

    if (!submission) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Submission with that ID not found",
      });
    }

    return {
      status: "success",
      data: {
        submission,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Submission with that id already exists",
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

export const updateFormShareHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateFormShareInput;
  session: Session;
  paramsInput: ParamsInput;
}) => {
  try {
    const userId = session.user.id;

    const question = await prisma.question.count({
      where: {
        form: { userId, id: paramsInput.id },
        options: { none: {} },
      },
    });

    if (question > 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Form has questions with unspecifed option",
      });
    }

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

export const updateFormStatusHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateFormStatusInput;
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
      data: { ...input, isShareable: false },
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

export const updateFormTitleHandler = async ({
  input,
  session,
  paramsInput,
}: {
  input: UpdateFormTitleInput;
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
