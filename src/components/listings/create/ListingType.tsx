import BackHeader from "@/components/layout/header/BackHeader";

import LentIcon from "@/public/svgs/listings/lent-icon.svg";
import ShareIcon from "@/public/svgs/listings/share-icon.svg";

interface ListingTypeProps {
  onSelectType: (type: "SHARE" | "RENT") => void;
}
const ListingType = ({ onSelectType }: ListingTypeProps) => {
  return (
    <>
      <BackHeader />
      <div className="py-9">
        <div className="gray-900 text-heading2 px-4 py-3">
          반가워요!
          <br /> 어떤 매물을 내놓을까요?
        </div>
        <div className="cursor-pointer flex items-center justify-center gap-6 px-4 py-8">
          <div className="group hover:bg-mint-light group hover:text-mint hover:border-mint flex h-[140px] w-[140px] flex-col gap-4 rounded-[4px] border border-gray-400 px-9 py-5">
            <ShareIcon />
            <div
              className="text-body1-sb group-hover:text-mint flex items-center justify-center text-gray-800"
              onClick={() => onSelectType("SHARE")}
            >
              쉐어
            </div>
          </div>
          <div className="group hover:bg-mint-light hover:text-mint hover:border-mint flex h-[140px] w-[140px] cursor-pointer flex-col gap-4 rounded-[4px] border border-gray-400 px-9 py-5">
            <LentIcon />
            <div
              className="group-hover:text-mint text-body1-sb flex items-center justify-center text-gray-800"
              onClick={() => onSelectType("RENT")}
            >
              렌트
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingType;
