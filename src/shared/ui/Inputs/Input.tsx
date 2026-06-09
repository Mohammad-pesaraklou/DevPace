import React, { ChangeEvent } from "react";

interface Props<T> {
  name: string;
  value: T;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: "text" | "number";
}

function Input({
  type = "text",
  changeHandler,
  name,
  placeholder,
  value,
}: Props<string | number>) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={changeHandler}
      className="bg-transparent text-white px-4 py-2 outline-none h-10 w-full border border-gray-400 rounded-lg"
    />
  );
}

export default Input;
