import clsx from "clsx";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: InputFieldProps) => {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-3 py-3">
      <label className="text-body1-sb text-gray-900">{label}</label>
      <div className="flex flex-col gap-1">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "text-body1-med h-[44px] rounded-sm border px-4 py-3 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none",
            value.trim() ? "border-gray-900" : "border-gray-600",
          )}
        />
        {hasError && <span className="text-cap1-med text-red">{error}</span>}
      </div>
    </div>
  );
};

export default InputField;
