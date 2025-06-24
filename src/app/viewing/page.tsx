"use client";

import { useState } from "react";

import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import SelectTab from "@/components/viewings/SelectTab";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

const Viewing = () => {
  const [activeTab, setActiveTab] = useState("confirmed");

  return (
    <ContentWrapper bottomOffset={62}>
      <TitleHeader title="뷰잉 관리" />
      <SelectTab activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "confirmed" && <ViewingConfirmedSection />}
      {activeTab === "canceled" && <ViewingCanceledSection />}
      {activeTab === "completed" && <ViewingCompletedSection />}
    </ContentWrapper>
  );
};

export default Viewing;
