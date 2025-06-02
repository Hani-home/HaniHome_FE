import ViewingBox from "@/components/home/ViewingBox";
import MainHeader from "@/components/layout/header/MainHeader";

import { viewingLists } from "@/constants/ViewingLists";

import HomeIcon from "@/public/svgs/common/home-icon.svg";

const Home = () => {
  return (
    <div className="flex flex-col pt-12">
      <MainHeader />
      <div className="bg-gray-0 flex flex-col pt-6 pb-2">
        <div className="mx-4 flex h-full w-fit translate-y-[1px] items-center justify-center gap-1 rounded-t-sm border border-b-0 border-gray-200 bg-white px-4 py-2">
          <HomeIcon className="text-mint h-6 w-6" />
          <span className="text-body1-sb text-mint h-[22px]">부동산</span>
        </div>
        <div className="flex flex-col gap-3 border-t border-gray-200 bg-white py-5">
          <span className="text-heading3 px-4 text-gray-900">
            다가오는 뷰잉 일정
          </span>
          <div className="scrollbar-hide flex w-full max-w-[375px] gap-1 overflow-x-auto px-4">
            {viewingLists.map(viewing => (
              <div key={viewing.id} className="flex shrink-0">
                <ViewingBox
                  key={viewing.id}
                  date={viewing.date}
                  time={viewing.time}
                  profileImg={viewing.profileImg}
                  roomImg={viewing.roomImg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
