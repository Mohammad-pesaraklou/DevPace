import React, { ComponentProps, forwardRef } from "react";

const UnControlledInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ type = "text", placeholder }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className="bg-transparent text-white px-4 py-2 outline-none h-10 w-full border border-gray-400 rounded-lg"
      />
    );
  },
);
UnControlledInput.displayName = "UnControlledInput";
export default UnControlledInput;
