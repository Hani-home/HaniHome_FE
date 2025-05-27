import React from "react";

import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-3 py-3">
        <label className="text-body1-sb text-gray-900">{label}</label>
        <div className="flex flex-col gap-1">
          <input
            ref={ref}
            {...props}
            className={clsx(
              "text-body1-med h-[44px] rounded-sm border px-4 py-3 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none",
              props.value?.toString().trim()
                ? "border-gray-900"
                : "border-gray-600",
              className,
            )}
          />
          {hasError && <span className="text-cap1-med text-red">{error}</span>}
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
