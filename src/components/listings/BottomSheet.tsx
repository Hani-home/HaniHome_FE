import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Divider from "../common/Divider";

interface BottomSheetProps {
  onClose: () => void;
}
const BottomSheet = ({ onClose }: BottomSheetProps) => {
  const { id } = useParams();
  const router = useRouter();
  return (
    <>
      {/* 오버레이 배경 */}
      <div
        className="fixed inset-0 z-80 bg-[rgba(72,74,79,0.6)]"
        onClick={onClose}
      />

      {/* 바텀 시트 */}
      <div
        className="fixed bottom-0 left-1/2 z-90 w-[375px] -translate-x-1/2 rounded-t-2xl border border-gray-500 bg-white pt-3"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pb-2">
          <div className="h-1 w-[53px] rounded-[50px] bg-gray-500" />
        </div>

        <Divider className="my-1" />
        <div
          className="text-body1-sb w-full cursor-pointer py-2 text-center text-gray-900"
          onClick={() => router.push(`/listings/${id}/edit`)}
        >
          매물정보 수정
        </div>
        <Divider className="my-1" />
        <div
          className="text-body1-sb w-full cursor-pointer py-2 text-center text-gray-900"
          onClick={onClose}
        >
          숨기기
        </div>
        <Divider className="my-1" />
        <div
          className="text-body1-sb text-red w-full cursor-pointer py-2 text-center"
          onClick={onClose}
        >
          삭제
        </div>
      </div>
    </>
  );
};
export default BottomSheet;
