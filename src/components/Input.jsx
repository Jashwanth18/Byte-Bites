import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={`px=3 py-2 rounded-log bg-white text-black outline-none focus:bg-gray-50 duration-300 border border-gray-200 w-full &{className}`}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
