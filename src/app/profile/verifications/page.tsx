"use client";

import { useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownField from "@/components/common/DropdownField";
import BackHeader from "@/components/layout/header/BackHeader";

import EmptyCheck from "@/public/svgs/common/empty-check.svg";
import FilledCheck from "@/public/svgs/common/filled-check.svg";

const VERIFICATION_OPTIONS = [
  { label: "여권", value: "passport" },
  { label: "운전면허증", value: "license" },
  { label: "거주허가증", value: "residence" },
];

const VerificationPage = () => {
  const [verif, setVerif] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <div className="flex h-screen max-w-[375px] flex-col">
      <BackHeader />

      {/* 인증수단선택 */}
      <div className="flex flex-col gap-8 px-4 py-6">
        <div className="flex flex-col">
          <h3 className="text-heading3 text-gray-800">인증수단선택</h3>
          <span className="text-cap1-med text-gray-600">
            여권 / 운전면허증 / 거주허가증 등 신원 인증 수단 업로드
          </span>
        </div>
        <div>
          <DropdownField
            value={verif}
            placeholder="선택"
            onChange={val => setVerif(val)}
            options={VERIFICATION_OPTIONS}
          />
        </div>
      </div>

      {/* 파일 업로드 */}
      <div className="px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-heading3 text-gray-800">파일 업로드</h3>
          <button className="text-lab1-sb flex h-9 w-[343px] cursor-pointer items-center justify-center rounded-[4px] border border-gray-600 py-[10px] text-gray-800">
            + 사진 업로드
          </button>
          <div className="text-cap1-med text-gray-400">
            <p>
              여권 운전면허증의 이름과 사진, 만료일이 명확히 보이도록
              업로드하세요
            </p>
            <p>허위 정보 업로드 시 서비스 이용이 제한될 수 있습니다</p>
          </div>
        </div>
      </div>

      {/* 이용약관동의 */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        onClick={() => setIsAgree(prev => !prev)}
      >
        {isAgree ? <FilledCheck /> : <EmptyCheck />}
        <span className="text-cap1-med h-8 w-[293px] text-gray-600">
          본인은 제출한 정보가 사실이며, 인증 목적 외에 사용되지 않음을 이해하고
          동의합니다.
        </span>
      </div>
      {verif && isAgree && (
        <BottomActionBar
          label="인증 신청"
          onClick={() => {
            // 인증 요청 로직
          }}
        />
      )}
    </div>
  );
};
export default VerificationPage;
