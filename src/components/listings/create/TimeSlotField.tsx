const TimeSlotField = () => {

  return (
    <div>
      <div className="flex justify-between px-4 py-3">
        <div className="text-gray-400 text-body1-sb">아침</div>
        <div className="flex gap-3">
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
          <div className="text-gray-300 text-body1-med">~</div>
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between px-4 py-3">
        <div className="text-gray-400 text-body1-sb">점심</div>
        <div className="flex gap-3">
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
          <div className="text-gray-300 text-body1-med">~</div>
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between px-4 py-3">
        <div className="text-gray-400 text-body1-sb">저녁</div>
        <div className="flex gap-3">
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
          <div className="text-gray-300 text-body1-med">~</div>
          <button className="bg-gray-0 flex h-[33px] gap-1 rounded-[4px] border border-gray-300 px-3 py-1">
            <span className="text-gray-300 text-body1-med">00</span>
            <span className="text-gray-300 text-body1-med">:</span>
            <span className="text-gray-300 text-body1-med">00</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotField;
