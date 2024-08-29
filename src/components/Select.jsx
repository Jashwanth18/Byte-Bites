import React, { useId } from "react";

const Select = React.forwardRef(
  ({ options = [], label, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <select
          options={options}
          id={id}
          {...props}
          ref={ref}
          className={`${className}`}
        >
          {options?.map((option, idx) => {
            <option key={idx} value={option}>
              {option}
            </option>;
          })}
        </select>
      </div>
    );
  }
);

export default Select;
