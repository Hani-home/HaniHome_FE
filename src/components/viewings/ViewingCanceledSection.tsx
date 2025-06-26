import { useState } from "react";

import { ViewingCardItem } from "@/types/viewing";

import CancelReasonModal from "./CancelReasonModal";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingCanceledSectionProps {
  data: ViewingCardItem[];
}

const ViewingCanceledSection = ({ data }: ViewingCanceledSectionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
  if (data.length === 0) {
    return (
      <p className="mt-8 text-center text-gray-500">취소된 뷰잉이 없습니다.</p>
    );
  }

  const selectedItem = data.find(item => item.id === openId);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {data.map(item => (
          <li key={item.id}>
            <ViewingManageCard
              id={item.id}
              status="CANCELLED"
              profileImageUrl={item.profileImageUrl}
              roomImageUrl={item.roomImageUrl}
              nickname={item.nickname}
              meetingDay={item.meetingDay}
              onArrowClick={() => setOpenId(item.id)}
            />
          </li>
        ))}
      </ul>

      {selectedItem && (
        <CancelReasonModal
          isOpen={openId !== null}
          reason={selectedItem.cancelReason ?? ""}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
};

export default ViewingCanceledSection;
