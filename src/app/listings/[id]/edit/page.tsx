"use client";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import { propertyInfo } from "@/constants/mock/listing-detail-dummies";

const images = propertyInfo[0].photoUrls;
const propertyDetail = propertyInfo[1];

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
        {propertyDetail && <DropDownSection listingData={propertyDetail} />}
      </div>
      <BottomActionBar label="저장" />
    </>
  );
};

export default ListingsEdit;
