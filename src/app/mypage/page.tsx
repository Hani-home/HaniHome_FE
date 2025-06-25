"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Divider from "@/components/common/Divider";
import TitleHeader from "@/components/layout/header/TitleHeader";

import Arrow from "@/public/svgs/common/left-arrow.svg";

const Mypage = () => {
  const router = useRouter();

  return (
    <div>
      {/*헤더*/}
      <TitleHeader title="마이페이지" />
      {/*바디 */}
      <div className="overflow-auto scrollbar-hide pb-[62px]">
        {/*프로필수정 */}
        <div className="flex h-22 items-center justify-between px-4 py-2">
          <div className="flex gap-[24px]">
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full">
              <Image
                src="/svgs/common/profile-img.svg"
                fill
                alt="프로필 이미지"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center">
              <div>김하니</div>
              <div className="flex h-[24px] w-[24px] items-center justify-center p-[2px]">
                <div className="relative h-[18px] w-[18px]">
                  <Image
                    src="/svgs/mypage/verification-badge.svg"
                    fill
                    alt="인증 배지"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Arrow
              onClick={() => router.push("profile/edit")}
              className="h-6 w-6 rotate-180 cursor-pointer text-gray-700"
            />
          </div>
        </div>

        <div className="py-4">
          {/*나의활동 */}
          <div className="px-5 py-3">
            <div className="text-heading3 text-gray-800">나의 활동</div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">내놓은 매물</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">구한 매물</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
          </div>
          <Divider />
          {/*고객지원 */}
          <div className="px-5 py-3">
            <div className="text-heading3 text-gray-800">고객 지원</div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">약관 및 정책</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">FAQ</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">1:1 문의</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
          </div>
          <Divider />
          <div className="px-5 py-3">
            <div className="text-heading3 text-gray-800">계정 관리</div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-gray-700">로그아웃</div>
              <Arrow className="h-[18px] w-[18px] rotate-180 cursor-pointer text-gray-700" />
            </div>
            <div className="flex h-[46px] items-center justify-between py-3">
              <div className="text-body1-med text-red">탈퇴</div>
              <Arrow className="text-red h-[18px] w-[18px] rotate-180 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
