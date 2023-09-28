import { TextFieldElement } from "react-hook-form-mui";

export const TextField = ({ name, label }: { name: string; label: string }) => {
  return <TextFieldElement name={name} label={label} required fullWidth />;
};
