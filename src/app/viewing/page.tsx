"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { useMyViewingList } from "@/hooks/viewing/useViewing";

import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import LoadingLottie from "@/components/common/LoadingLottie";
import SelectTab from "@/components/common/SelectTab";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { viewingTabs } from "@/constants/viewing-tabs";

import { ViewingCardItem, ViewingStatus } from "@/types/viewing";

const Viewing = () => {
  const { isLoggedIn, memberId } = useAuthStore();

  const [activeTab, setActiveTab] = useState<ViewingStatus>("REQUESTED");
  const { data = [], isLoading } = useMyViewingList<ViewingCardItem[]>({
    view: "DEFAULT",
  });

  const filtered = data.filter(v => v.status === activeTab);
  const withUserType: ViewingCardItem[] = filtered.map(v => ({
    ...v,
    userType: Number(memberId) === v.memberId ? "guest" : "host",
  }));

  return (
    <ContentWrapper className="flex h-screen w-full flex-col" bottomOffset={62}>
      <TitleHeader title="뷰잉 관리" />
      <div className="sticky top-12 z-10 bg-white">
        <SelectTab
          tabs={viewingTabs}
          activeTab={activeTab}
          onChange={tab => setActiveTab(tab as ViewingStatus)}
        />
      </div>

      <main className="flex flex-1 flex-col">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            <LoadingLottie />
          </div>
        ) : !isLoggedIn ? (
          <GuestLoginGuide
            type="viewing"
            description={`로그인 후 마음에 드는 매물의\n뷰잉 일정을 잡을 수 있어요`}
          />
        ) : activeTab === "REQUESTED" ? (
          <ViewingConfirmedSection
            data={withUserType}
            memberId={Number(memberId)}
          />
        ) : activeTab === "CANCELLED" ? (
          <ViewingCanceledSection data={withUserType} />
        ) : (
          <ViewingCompletedSection data={withUserType} />
        )}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
