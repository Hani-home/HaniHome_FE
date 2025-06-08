import Divider from "@/components/common/Divider";

import HomeIcon from "@/public/svgs/common/home-icon.svg";
import Arrow from "@/public/svgs/common/left-arrow.svg";
import PersonIcon from "@/public/svgs/common/mypage-icon.svg";
import BathroomIcon from "@/public/svgs/listings/bathroom-icon.svg";
import HomeFilledIcon from "@/public/svgs/listings/home-filled-icon.svg";

import BadgeList from "./BadgeLists";

const ListingDetail = () => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <div className="flex justify-between px-4 py-3">
        <span className="text-body1-sb text-gray-900">매물 유형</span>
        <span className="text-body2-med text-gray-700">세컨드 룸 쉐어</span>
      </div>

      <Divider />

      <div className="flex w-full py-3">
        <div className="flex w-1/2 flex-col gap-3 px-4">
          <span className="text-body1-sb text-gray-900">쉐어 인원</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[6px]">
              <PersonIcon className="text-gray-600" />
              <span className="text-body2-med text-gray-700">총 n명 거주</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <BathroomIcon />
              <span className="text-body2-med text-gray-700">
                욕실 3인 쉐어
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-3 px-4">
          <span className="text-body1-sb text-gray-900">층수</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[6px]">
              <HomeIcon className="h-6 w-6 text-gray-600" />
              <span className="text-body2-med text-gray-700">총 n층</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <HomeFilledIcon className="h-6 w-6 text-gray-600" />
              <span className="text-body2-med text-gray-700">n층에 위치</span>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2 px-4 py-3">
        <span className="text-body1-sb text-gray-900">주차</span>
        <div className="text-body2-med flex gap-4 text-gray-700">
          <span>전용공간 있음</span>
          <span>|</span>
          <span>Street parking 가능</span>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between px-4 py-3">
        <span className="text-body1-sb text-gray-900">제공되는 가구</span>
        <button className="cursor-pointer">
          <Arrow className="rotate-180 text-gray-700" />
        </button>
      </div>

      <Divider />

      <div className="flex flex-col gap-3 px-4 py-3">
        <span className="text-body1-sb text-gray-900">호스트 설명</span>
        <div className="flex max-w-[343px] flex-col gap-4">
          <div className="text-body2-med flex rounded bg-gray-200 px-2 py-3 break-words whitespace-normal text-gray-700">
            여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명
          </div>
          <BadgeList />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
