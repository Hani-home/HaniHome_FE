interface DropdownOptionsListProps<T extends string> {
  optionKeys: T[]; //영어
  options: string[]; //한국어
  value: T | null;
  onSelect: (val: T) => void;
}

function DropdownOptionsList<T extends string>({
  optionKeys,
  options,
  value,
  onSelect,
}: DropdownOptionsListProps<T>) {

  return (
    <ul className="flex flex-col gap-3 px-4 py-3">
      {optionKeys.map((key, idx) => (
        <li
          key={key}
          className={`text-lab1-sb flex w-[343px] cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${
            value === key
              ? "border-mint bg-mint-light text-mint"
              : "border-gray-600 text-gray-800"
          }`}
          onClick={() => onSelect(key)}
        >
          {options[idx]}
        </li>
      ))}
    </ul>
  );
}

export default DropdownOptionsList;
