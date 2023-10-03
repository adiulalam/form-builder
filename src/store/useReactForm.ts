import type { Control } from "react-hook-form";
import { create } from "zustand";
import { useContext } from "react";
import { FormContext } from "./FormProvider";
import { useForm } from "react-hook-form";

type ControlType = Control<Record<string, string>>;

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
    (acc, { id }) => ({ ...acc, [id]: "" }),
    {} as Record<string, string>,
  );

  const { handleSubmit, control } = useForm<Record<string, string>>({
    defaultValues,
    shouldUnregister: true,
  });
  setControl(control);

  return { handleSubmit, control };
};
