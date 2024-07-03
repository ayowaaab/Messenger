"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  register,
  required,
  errors,
  type = "text",
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        required={required}
        id={id}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="text-black font-light py-2
        px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
