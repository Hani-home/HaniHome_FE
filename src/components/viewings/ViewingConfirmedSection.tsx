import { useState } from "react";

import { calculateDday } from "@/utils/dateFormatter";

import { ViewingCardItem } from "@/types/viewing";

import CancelModal from "./CancelModal";
import DdayBadge from "./DdayBadge";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingConfirmedSectionProps {
  data: ViewingCardItem[];
  currentUserId: number;
}

const ViewingConfirmedSection = ({
  data,
  currentUserId,
}: ViewingConfirmedSectionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {data
        .filter(item => calculateDday(item.meetingDay) >= 0)
        .sort(
          //API에서 meetingDate로 정렬 지원, 추후 삭제
          (a, b) => calculateDday(a.meetingDay) - calculateDday(b.meetingDay),
        )
        .map(item => {
          const dday = calculateDday(item.meetingDay);
          const isHost = currentUserId === item.memberId;
          const userType: "host" | "guest" = isHost ? "host" : "guest";

          return (
            <div key={item.id}>
              <DdayBadge dday={dday} />
              <ViewingManageCard
                status="REQUESTED"
                profileImageUrl={item.profileImageUrl}
                roomImageUrl={item.roomImageUrl}
                nickname={item.nickname}
                meetingDay={item.meetingDay}
                onCancelClick={() => setOpenId(item.id)}
              />
              {openId === item.id && (
                <CancelModal
                  userType={userType}
                  onClose={() => setOpenId(null)}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ViewingConfirmedSection;
