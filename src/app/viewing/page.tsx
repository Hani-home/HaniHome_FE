"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getViewingList } from "@/apis/viewing";

import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import SelectTab from "@/components/viewings/SelectTab";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { ViewingCardItem } from "@/types/viewing";

const currentUserId = 1; // 추후 로그인 상태에서 가져오기

const Viewing = () => {
  const [activeTab, setActiveTab] = useState("confirmed");

  const { data: viewings = [], isLoading } = useQuery({
    queryKey: ["viewings"],
    queryFn: getViewingList,
  });

  const withUserType: ViewingCardItem[] = viewings.map(v => ({
    ...v,
    userType: v.memberId === currentUserId ? "guest" : "host",

    profileImageUrl: "/images/profile1.png",
    roomImageUrl: "/images/room1.png",
    nickname: "상대닉네임",
  }));

  const confirmed = withUserType.filter(v => v.status === "REQUESTED");
  // const canceled = withUserType.filter(v => v.status === "CANCELLED");
  // const completed = withUserType.filter(v => v.status === "COMPLETED");

  return (
    <ContentWrapper bottomOffset={62}>
      <TitleHeader title="뷰잉 관리" />
      <SelectTab activeTab={activeTab} onChange={setActiveTab} />

      <main>
        {isLoading && <p>로딩 중...</p>}

        {!isLoading && activeTab === "confirmed" && (
          <ViewingConfirmedSection
            data={confirmed}
            currentUserId={currentUserId}
          />
        )}
        {!isLoading && activeTab === "canceled" && <ViewingCanceledSection />}
        {!isLoading && activeTab === "completed" && <ViewingCompletedSection />}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
