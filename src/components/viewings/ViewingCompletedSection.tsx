import { ViewingCardItem } from "@/types/viewing";

import ViewingManageCard from "./ViewingManageCard";

interface ViewingCompletedSectionProps {
  data: ViewingCardItem[];
}

const ViewingCompletedSection = ({ data }: ViewingCompletedSectionProps) => {
  if (data.length === 0) {
    return (
      <p className="mt-8 text-center text-gray-500">완료된 뷰잉이 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map(item => {
        return (
          <li key={item.id}>
            <ViewingManageCard
              id={item.id}
              status="COMPLETED"
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

export default ViewingCompletedSection;
