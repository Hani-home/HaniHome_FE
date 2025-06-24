import { useState } from "react";

import { ViewingCardItem } from "@/types/viewing";

import CancelModal from "./CancelModal";
import DdayBadge from "./DdayBadge";
import ViewingManageCard from "./ViewingManageCard";

interface Props {
  data: ViewingCardItem[];
  currentUserId: number;
}

const ViewingConfirmedSection = ({ data, currentUserId }: Props) => {
  const [openId, setOpenId] = useState<number | null>(null); // 어떤 뷰잉의 모달이 열렸는지

  return (
    <div className="flex flex-col gap-4">
      {data.map(item => {
        const isHost = currentUserId === item.memberId;
        const userType: "host" | "guest" = isHost ? "host" : "guest";
        const dateObj = new Date(item.meetingDay);

        return (
          <div key={item.id}>
            <DdayBadge dday={3} /> {/* D-day 계산 로직 추가 가능 */}
            <ViewingManageCard
              profileImageUrl={item.profileImageUrl}
              roomImageUrl={item.roomImageUrl}
              nickname={item.nickname}
              date={dateObj.toLocaleDateString("ko-KR")}
              time={dateObj.toTimeString().slice(0, 5)}
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
