import { ViewingCardItem } from "@/types/viewing";

import ViewingManageCard from "./ViewingManageCard";

interface ViewingCanceledSectionProps {
  data: ViewingCardItem[];
}

const ViewingCanceledSection = ({ data }: ViewingCanceledSectionProps) => {
  if (data.length === 0) {
    return (
      <p className="mt-8 text-center text-gray-500">취소된 뷰잉이 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map(item => {
        return (
          <li key={item.id}>
            <ViewingManageCard
              status="CANCELLED"
              profileImageUrl={item.profileImageUrl}
              roomImageUrl={item.roomImageUrl}
              nickname={item.nickname}
              meetingDay={item.meetingDay}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ViewingCanceledSection;
