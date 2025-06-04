import Image from "next/image";

interface ViewingBoxProps {
  date: string;
  time: string;
  profileImg: string;
  roomImg: string;
}

const ViewingBox = ({ date, time, profileImg, roomImg }: ViewingBoxProps) => {
  return (
    <div className="flex w-fit shrink-0 gap-4 rounded-sm border border-gray-200 px-3 py-2">
      {/* 이미지 묶음 */}
      <div className="relative h-9 w-9 shrink-0">
        <Image
          src={profileImg}
          alt="유저"
          width={24}
          height={24}
          className="absolute top-0 left-0 z-1 h-6 w-6 rounded-full border-[0.67px] border-gray-300 object-cover"
        />
        <Image
          src={roomImg}
          alt="룸"
          width={24}
          height={24}
          className="absolute top-3 left-3 h-6 w-6 rounded-[2.67px] border-[0.67px] border-gray-300 object-cover"
        />
      </div>

      {/* 시간 정보 */}
      <div className="flex flex-col justify-center">
        <span className="text-cap1-med text-gray-500">{date}</span>
        <span className="text-body2-med text-gray-800">{time}</span>
      </div>
    </div>
  );
};

export default ViewingBox;
