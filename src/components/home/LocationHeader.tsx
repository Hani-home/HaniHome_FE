import Arrow from "@/public/svgs/common/left-arrow.svg";

const LocationHeader = () => (
  <div className="mb-1 flex w-full items-center justify-between px-4 py-2">
    <p className="text-heading2 text-gray-900">chastwood</p>
    <Arrow className="rotate-180 cursor-pointer text-gray-600" />
  </div>
);

export default LocationHeader;
