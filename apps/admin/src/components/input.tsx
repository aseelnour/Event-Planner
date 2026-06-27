//UI
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;
export const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
