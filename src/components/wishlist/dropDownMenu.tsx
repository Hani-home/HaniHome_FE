import Divider from "@/components/common/Divider";

interface DropDownMenuProps {
  onSelect: (order: "latest" | "popular") => void;
}
const DropDownMenu = ({ onSelect }: DropDownMenuProps) => {
  return (
    <div className="text-lab1-sb h-[86px] w-[70px] rounded border border-gray-300 bg-white px-4 py-3 text-gray-800">
      <div className="flex flex-col gap-[8px]">
        <button
          className="cursor-pointer pb-1"
          onClick={() => onSelect("latest")}
        >
          최신순
        </button>
        <Divider />
        <button
          className="cursor-pointer pt-1"
          onClick={() => onSelect("popular")}
        >
          인기순
        </button>
      </div>
    </div>
  );
};
export default DropDownMenu;
