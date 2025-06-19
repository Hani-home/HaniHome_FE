import Image from "next/image";

import FilledHeart from "@/public/svgs/wishlist/filled-heart.svg";

interface ListingCardProps {
  image: string;
  price: string;
  status: string;
  area: string;
  floor: string;
  type: string;
  options: string;
  distance: string;
  location: string;
  timeAgo: string;
  likes: number;
}
const RoomList = (props: ListingCardProps) => {
  const {
    image,
    price,
    status,
    area,
    floor,
    type,
    options,
    distance,
    location,
    timeAgo,
    likes,
  } = props;
  return (
    <div
      className={`flex flex-row gap-4 border px-4 py-3 ${status == "거래 중" ? "" : "opacity-60"}`}
    >
      <Image
        src={image}
        alt="thumbnail"
        width={108}
        height={108}
        unoptimized
        className="rounded-[4px]"
        style={{ width: "108px", height: "108px", objectFit: "cover" }}
      />

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col pb-[8px]">
          <div className="flex flex-row gap-[6px]">
            <div className="text-body1-sb text-gray-900">{price}</div>
            <div
              className={`text-cap1-med flex items-center justify-center rounded-[100px] border ${
                status == "거래 중"
                  ? "border-violet bg-violet-ultralight h-5 w-[50px]"
                  : "h-5 w-[58px] border-gray-300"
              }`}
            >
              {status}
            </div>
          </div>

          <div className="text-cap1-med flex flex-row gap-[4px] pb-[2px] text-gray-600">
            <div>{area}</div>
            <div className="text-gray-300">•</div>
            <div>{floor}</div>
            <div className="text-gray-300">•</div>
            <div>{type}</div>
          </div>

          <div className="text-cap1-med flex flex-row gap-[4px] pb-[16px] text-gray-600">
            <div>{options}</div>
            <div className="text-gray-300">•</div>
            <div>{distance}</div>
          </div>

          <div className="text-cap1-med text-gray-500">{location}</div>
        </div>

        <div className="gap-[12px] flex flex-col items-center">
          <div>
            <FilledHeart className="text-mint" />
            <div className="text-cap1-med text-gray-400">{likes}</div>
          </div>

          <div className="text-cap1-med text-gray-500">{timeAgo}</div>
        </div>
      </div>
    </div>
  );
};
export default RoomList;
