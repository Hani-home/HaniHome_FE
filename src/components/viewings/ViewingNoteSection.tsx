import { useRef, useState } from "react";

import Divider from "@/components/common/Divider";

import CameraIcon from "@/public/svgs/viewings/camera-icon.svg";

const ViewingNoteSection = () => {
  const [memo, setMemo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // 높이 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 늘림
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* 사진 섹션 */}
      <section className="flex w-full gap-1">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-heading3 text-gray-800">사진 기록</p>
          <span className="text-cap1-med text-gray-600">
            뷰잉한 매물의 내/외부 사진을 남겨주세요 (최대 10장)
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CameraIcon />
          <span className="text-cap1-med text-gray-800">촬영</span>
        </div>
      </section>

      <Divider className="my-4" />

      {/* 텍스트 메모 섹션 */}
      <section className="flex flex-col gap-4 py-3">
        <p className="text-heading3 text-gray-800">메모</p>
        <textarea
          ref={textareaRef}
          placeholder="뷰잉한 매물의 특징을 기록해봐요"
          maxLength={500}
          rows={1}
          onChange={handleChange}
          className="text-body1-med bg-gray-0 w-full resize-none rounded p-3 text-gray-700 outline-none placeholder:text-gray-400"
        />
        <span className="text-cap1-med block text-right text-gray-400">
          {memo.length}/500
        </span>
      </section>
    </div>
  );
};

export default ViewingNoteSection;
