import React from "react";

import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  actionLabel?: string;
  successMessage?: string;
  actionClickable?: boolean;
  onActionClick?: () => void;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      errorMessage,
      className,
      actionLabel,
      successMessage,
      actionClickable,
      onActionClick,
      ...props
    },
    ref,
  ) => {
    const value = typeof props.value === "string" ? props.value : "";

    return (
      <div className="flex flex-col gap-3 py-3">
        <div className="flex items-center gap-3">
          <label className="text-body1-sb text-gray-900">{label}</label>
          {actionLabel && (
            <button
              type="button"
              disabled={!actionClickable}
              onClick={onActionClick}
              className={clsx(
                "text-lab1-b transition-colors",
                actionClickable
                  ? "text-violet cursor-pointer"
                  : "cursor-default text-gray-500",
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            ref={ref}
            {...props}
            className={clsx(
              "text-body1-med h-[44px] rounded-sm border px-4 py-3 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none",
              value.trim() ? "border-gray-900" : "border-gray-600",
              className,
            )}
          />
          {errorMessage && (
            <span className="text-cap1-med text-red">{errorMessage}</span>
          )}
          {successMessage && (
            <span className="text-cap1-med text-green">{successMessage}</span>
          )}
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
