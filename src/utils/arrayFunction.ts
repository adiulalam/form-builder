import { Type } from "@prisma/client";

export const textInputTypes = [Type.INPUT];

export const includesInputType = (type: Type) => {
  return textInputTypes.includes(type as never);
};
