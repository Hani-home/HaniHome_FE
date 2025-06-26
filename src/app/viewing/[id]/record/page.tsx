"use client";

import { useState } from "react";

import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";
import SelectTab from "@/components/viewings/SelectTab";
import ViewingNoteSection from "@/components/viewings/ViewingNoteSection";

import { viewingNoteTabs } from "@/constants/viewing-tabs";

const ViewingRecordPage = () => {
  const [activeTab, setActiveTab] = useState("note");
  return (
    <ContentWrapper>
      <BackHeader />
      <SelectTab
        tabs={viewingNoteTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "note" && <ViewingNoteSection />}
    </ContentWrapper>
  );
};

export default ViewingRecordPage;
