import type { Control } from "react-hook-form";
import { create } from "zustand";
import { useContext } from "react";
import { FormContext } from "./FormProvider";
import { useForm } from "react-hook-form";
import type { Option } from "@prisma/client";

type ControlType = Control<Record<string, Option>>;

type ReactFormType = {
  control: ControlType;
  setControl: (obj: ControlType) => void;
};

export const useReactForm = create<ReactFormType>((set) => ({
  control: {} as ControlType,
  setControl: (obj: ControlType) => set({ control: obj }),
}));

export const useReactHookForm = () => {
  const { questions } = useContext(FormContext);
  const setControl = useReactForm((state) => state.setControl);

  const defaultValues = questions?.reduce(
    (acc, { id }) => ({ ...acc, [id]: undefined }),
    {},
  );

  const { handleSubmit, control, reset, setValue } = useForm<
    Record<string, Option>
  >({
    defaultValues,
    shouldUnregister: true,
  });
  setControl(control as ControlType);

  return { handleSubmit, control, reset, setValue };
};
