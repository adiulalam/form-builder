import type { PlaygroundProviderType } from "@/types/Provider.types";
import { useReducer } from "react";
import { getPlaygroundForm } from "@/utils/landing.config";
import type { Status, Type } from "@prisma/client";

export type PlaygroundAction =
  | {
      type: "addQuestion";
      payload: { type: Type };
    }
  | {
      type: "addOption";
      payload: { id: string; value: string };
    }
  | {
      type: "changeQuestionName";
      payload: { id: string; title: string };
    }
  | {
      type: "changeFormStatus";
      payload: { status: Status };
    }
  | { type: "reOrderQuestion"; payload: { id: string; order: number }[] }
  | { type: "deleteOption"; payload: { id: string; questionId: string } }
  | { type: "deleteAllOptions"; payload: { id: string } }
  | { type: "deleteQuestion"; payload: { id: string } }
  | {
      type: "changeQuestionType";
      payload: { id: string; type: Type };
    };

const reducer = (state: PlaygroundProviderType, action: PlaygroundAction) => {
  if (!state.isPlayground) return state;

  switch (action.type) {
    case "deleteOption": {
      const { questionId, id } = action.payload;

      const questions = state.form.questions!.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options!.filter((option) => option.id !== id),
            }
          : question
      );

      return {
        ...state,
        form: {
          ...state.form,
          questions,
        },
      };
    }

    case "addOption": {
      const { id, value } = action.payload;

      const option = {
        id: crypto.randomUUID(),
        value: value,
        questionId: id,
        showInput: false,
        isOtherOption: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const questions = state.form.questions!.map((question) =>
        question.id === id
          ? { ...question, options: [...(question.options ?? []), option] }
          : question
      );

      return {
        ...state,
        form: {
          ...state.form,
          questions,
        },
      };
    }

    case "addQuestion": {
      const formId = state.form.id;
      const type = action.payload.type;
      const questionLength = (state.form.questions?.length ?? 0) + 1;
      const question = {
        id: crypto.randomUUID(),
        question: `New Question ${questionLength}`,
        order: questionLength,
        type,
        formId: formId,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: undefined,
      };

      const questions = [...(state.form.questions ?? []), question];

      return {
        ...state,
        form: {
          ...state.form,
          questions,
        },
      };
    }

    case "changeFormStatus": {
      const { payload } = action;
      state.form.status = payload.status;
      return { ...state };
    }

    case "deleteQuestion": {
      const { payload } = action;
      state.form.questions = state.form.questions!.filter(
        (question) => question.id !== payload.id
      );
      return { ...state };
    }

    case "changeQuestionType": {
      const { payload } = action;
      state.form.questions!.find(
        (question) => question.id === payload.id
      )!.type = payload.type!;
      return { ...state };
    }

    case "deleteAllOptions": {
      const { payload } = action;
      state.form.questions!.find(
        (question) => question.id === payload.id
      )!.options = [];
      return { ...state };
    }

    case "changeQuestionName": {
      const { payload } = action;
      state.form.questions!.find(
        (question) => question.id === payload.id
      )!.question = payload.title;
      return { ...state };
    }

    case "reOrderQuestion": {
      const { payload } = action;
      payload.forEach((item) => {
        state.form.questions!.find(
          (question) => question.id === item.id
        )!.order = item.order;
      });
      state.form.questions!.sort((a, b) => a.order - b.order);
      return { ...state };
    }

    default: {
      throw new Error();
    }
  }
};

const initialState = getPlaygroundForm();

export const usePlaygroundReducer = () => useReducer(reducer, initialState);
