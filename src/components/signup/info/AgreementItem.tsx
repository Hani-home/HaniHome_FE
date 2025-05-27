import CheckIcon from "./CheckIcon";

interface AgreementItemProps {
  id: number;
  label: string;
  checked: boolean;
  onClick: () => void;
}

const AgreementItem = ({ id, label, checked, onClick }: AgreementItemProps) => {
  const isRequired = label.includes("[필수]");

  return (
    <button
      key={id}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 text-left"
    >
      {!isRequired && <CheckIcon checked={checked} />}
      <span className="text-cap1-med text-gray-500">{label}</span>
    </button>
  );
};

export default AgreementItem;
