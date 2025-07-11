"use client";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";
import { ListingValueMap } from "@/types/listingDetail";

import { listingDetails } from "@/constants/mock/listing-detail-dummies";

const images = listingDetails[1].image;
const listingData = listingDetails[1] as ListingValueMap; // 타입 캐스팅

const ListingsEdit = () => {
  return (
    <>
      <div className="w-[375px] pb-[130px]">
        <BackHeader />
        <TitleSection
          title="수정할 정보 섹션을 클릭해주세요"
          label="추가로 변경해야하는 섹션도 수정해주세요"
        />
        <div className="px-4">
          <ImageSlider images={images} />
        </div>
        {listingData && <DropDownSection listingData={listingData} />}
      </div>
      <BottomActionBar label="저장" />
    </>
  );
};

export default ListingsEdit;