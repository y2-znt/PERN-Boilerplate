import { Input } from "./input";
import { Label } from "./label";

interface InputWithLabelProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export function InputWithLabel({
  label,
  id,
  type,
  placeholder,
  required,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
