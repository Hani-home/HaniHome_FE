"use client";

import { useParams } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import { usePropertyDetailEditList } from "@/hooks/property/useProperty";

import toPostPropertyDetail from "@/utils/toPostPropertyDetail";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import {
  RentPropertyDetail,
  SharePropertyDetail,
} from "@/types/listingDetailPost";

const ListingsEdit = () => {
  const params = useParams();
  const id = params.id as string;
  const [propertyDetail, setPropertyDetail] = useState<
    SharePropertyDetail | RentPropertyDetail | null
  >(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");

  useEffect(() => {
    if (data) {
      const detail = toPostPropertyDetail(data);
      setPropertyDetail(detail);
      setPreviewUrls(data.photoUrls);
    }
  }, [data]);

  const handleRemoveImage = useCallback((index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !propertyDetail) return <div>데이터를 불러올 수 없습니다.</div>;
  // console.log(propertyDetail);
  return (
    <>
      <div className="w-[375px] pb-[130px]">
        <BackHeader />
        <TitleSection
          title="수정할 정보 섹션을 클릭해주세요"
          label="추가로 변경해야하는 섹션도 수정해주세요"
        />
        <div className="px-4">
          <ImageSlider images={previewUrls} onRemove={handleRemoveImage} />
        </div>
        {propertyDetail && <DropDownSection listingData={propertyDetail} />}
      </div>
      <BottomActionBar label="저장" />
    </>
  );
};

export default ListingsEdit;
