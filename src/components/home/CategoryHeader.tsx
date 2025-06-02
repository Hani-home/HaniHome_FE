import HomeIcon from "@/public/svgs/common/home-icon.svg";

const CategoryHeader = () => (
  <div className="mx-4 flex h-full w-fit translate-y-[1px] items-center justify-center gap-1 rounded-t-sm border border-b-0 border-gray-200 bg-white px-4 py-2">
    <HomeIcon className="text-mint h-6 w-6" />
    <span className="text-body1-sb text-mint h-[22px]">부동산</span>
  </div>
);

export default CategoryHeader;
