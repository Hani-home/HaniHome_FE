"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DetailTabs from "@/components/listings/DetailTabs";
import CheckIcon from "@/components/signup/info/CheckIcon";

import LocationImage from "@/public/svgs/listings/location-image.svg";

const ListingDetailPage = () => {
  const params = useParams();
  const listingId = params?.id as string;

  return (
    <>
      <div className="flex min-h-screen flex-col pt-12 pb-16">
        <BackHeader rightIcon="report" />
        <Image
          src="/svgs/common/room-img.svg"
          width={375}
          height={375}
          alt="매물 이미지"
          className="h-[375px] w-[375px] rounded-sm border border-gray-200 object-cover"
          priority
        />

        <div className="flex items-center gap-[14px] border-b border-gray-200 px-4 py-3">
          {/* 프로필 이미지 */}
          <div className="h-12 w-12 rounded-full border border-gray-300" />
          <span className="text-body1-sb font-bold text-black">하니하니</span>
        </div>

        <div className="flex justify-between px-4 py-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-heading1">
                <span className="text-gray-900">주 / </span>
                <span className="text-mint">300$</span>
              </span>
              <span className="text-body2-med flex h-fit items-center justify-center rounded-[100px] border border-gray-300 px-[10px] py-1 text-gray-700">
                거래중
              </span>
            </div>
            <div className="text-body1-sb flex gap-3 text-gray-700">
              <span>City</span>
              <span>|</span>
              <span>suburb</span>
            </div>
          </div>
          <div className="text-cap1-med flex flex-col items-end justify-between gap-4 text-gray-700">
            <div className="flex gap-1">
              <span>빌 포함</span>
              <CheckIcon checked={false} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span>(Internal Area)㎡ </span>
              <span className="text-gray-500">(Total Area)㎡ </span>
            </div>
          </div>
        </div>

        <DetailTabs listingId={listingId} />
        <div className="mt-6 mb-15">
          <div className="flex flex-col gap-3 px-4 py-8">
            <span className="text-body1-sb text-gray-900">위치</span>

            <div className="relative">
              {/* 지도 이미지 */}
              <LocationImage className="h-[343px] w-[343px]" />

              {/* 오버레이 안내 문구 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-heading3 text-center text-gray-900">
                  상세 주소는 뷰잉 예약 후 확인 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomActionBar label="뷰잉 예약하기" />
    </>
  );
};

export default ListingDetailPage;
