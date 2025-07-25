import ModalLayout from "@/components/common/ModalLayout";

import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

interface ListingHideModalProps {
  onClose: () => void;
}
const baseClass =
  "flex h-9 flex-1 justify-center items-center rounded-[4px] border cursor-pointer text-lab1-b";
const ListingHideModal = ({ onClose }: ListingHideModalProps) => {
  return (
    <ModalLayout onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3">
            <AlertIcon />
            <div className="text-red text-body1-sb">
              이 매물에 확정된 뷰잉 예약이 있어요
            </div>
          </div>
          <div className="text-body2-med text-center text-gray-700">
            이 상세페이지를 숨기면, 뷰잉을 예약한 게스트가
            <br /> 상세페이지를 볼 수 없게 되어 문제가 발생할 수 있어요. <br />
            숨김 처리와 함께 해당 예약을 취소하시겠어요?
          </div>
        </div>
        <div className="flex justify-between gap-[5px]">
          <button className={`border-mint text-mint ${baseClass}`}>
            숨기기만 하기
          </button>
          <button
            className={`bg-mint border-transparent text-white ${baseClass} `}
          >
            예약 취소 후 숨기기
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};
export default ListingHideModal;
