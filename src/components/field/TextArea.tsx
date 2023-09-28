import { TextareaAutosizeElement } from "react-hook-form-mui";

export const TextArea = ({
  name,
  label,
  rows = 1,
}: {
  name: string;
  label: string;
  rows?: number;
}) => {
  return (
    <TextareaAutosizeElement
      name={name}
      label={label}
      required
      fullWidth
      rows={rows}
    />
  );
};
