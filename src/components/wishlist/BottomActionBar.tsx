const BottomActionBar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 z-100 flex w-[375px] -translate-x-1/2 flex-col items-center bg-white transition">
      <div className="h-[1px] w-full bg-gray-300" />
      <div className="flex w-[343px] gap-[10px] py-2">
        <button
          className="w-1/2 h-[48px] border border-mint bg-white text-mint text-heading3 flex items-center justify-center cursor-pointer"
        >
          상세페이지 이동
        </button>
        <button
          className="w-1/2 h-[48px] bg-mint text-white text-heading3 flex items-center justify-center cursor-pointer"
        >
          뷰잉 예약하기
        </button>
      </div>
    </div>
  );
};

export default BottomActionBar;
