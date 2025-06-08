import Divider from "@/components/common/Divider";

import ExtraConditions from "./ExtraConditions";

const MoveInCondition = () => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-body1-sb text-gray-900">거주 가능 조건</span>
        <div className="text-body2-med flex flex-col items-end gap-1 text-gray-700">
          <span>성별 무관</span> <span>최대 3인 1실</span>
        </div>
      </div>
      <Divider />
      <div className="flex w-full py-3">
        <div className="flex w-1/2 flex-col gap-2 px-4">
          <span className="text-body1-sb text-gray-900">노티스</span>
          <span className="text-body2-med text-gray-700">최소 n주 전</span>
        </div>
        <div className="flex w-1/2 flex-col gap-2 px-4">
          <span className="text-body1-sb text-gray-900">최소 거주 기간</span>
          <span className="text-body2-med text-gray-700">최소 n주</span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 px-4 py-3">
        <span className="text-body1-sb text-gray-900">입주 가능일</span>
        <div className="text-body2-med flex text-gray-700">
          25년 5월 nn일
          <span>&nbsp;-&nbsp;</span>
          25년 6월 nn일
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-body1-sb text-gray-900">추가 고려사항</span>
          <span className="text-body2-med text-gray-600">조건 협의 가능</span>
        </div>
        <ExtraConditions />
      </div>
    </div>
  );
};

export default MoveInCondition;
