interface SelectTabProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { key: "requested", label: "예약 확정" },
  { key: "canceled", label: "취소" },
  { key: "completed", label: "완료" },
] as const;

const SelectTab = ({ activeTab, onChange }: SelectTabProps) => {
  return (
    <div className="flex px-4 pt-3 pb-2">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`text-body1-sb flex-1 cursor-pointer border-b p-2.5 text-center ${
            activeTab === tab.key
              ? "font-gray-900 border-gray-700"
              : "border-white text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SelectTab;
