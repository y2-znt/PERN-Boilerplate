import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { InputWithLabel } from "./InputWithLabel";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const FormField = ({
  id,
  label,
  type,
  placeholder,
  error,
  register,
}: FormFieldProps) => (
  <div>
    <InputWithLabel
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      {...register}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);
