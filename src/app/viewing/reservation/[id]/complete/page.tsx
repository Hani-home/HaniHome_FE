"use client";

import { useSearchParams } from "next/navigation";

import CompletePage from "@/components/common/CompletePage";

const ViewingCompletePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <CompletePage
      message="예약이 완료되었어요!"
      description={[
        "상세주소는",
        "매물 상세페이지를",
        "다시 들어가 확인해주세요",
      ]}
      buttonLabel="주소 확인하기"
      redirectUrl={`/listing/${id}`}
    />
  );
};

export default ViewingCompletePage;
