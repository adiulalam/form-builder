import type { PlaygroundProviderType } from "@/types/Provider.types";
import { useReducer } from "react";
import { getPlaygroundForm } from "@/utils/landing.config";

export type PlaygroundAction =
  | {
      type: "name";
      payload?: undefined;
    }
  | {
      type: "changeQuestionName";
      payload: { id: string; title: string };
    }
  | { type: "reOrderQuestion"; payload: { id: string; order: number }[] };

const reducer = (state: PlaygroundProviderType, action: PlaygroundAction) => {
  if (!state.isPlayground) return state;

  switch (action.type) {
    case "name": {
      state.form.title = "New Form Clicked";
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
