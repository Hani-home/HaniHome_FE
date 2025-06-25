"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Divider from "@/components/common/Divider";
import TitleHeader from "@/components/layout/header/TitleHeader";
import Section from "@/components/mypage/SectionItems";

import { getSections } from "@/constants/mypage-section";

import { SectionData } from "@/types/mypageSection";

import Arrow from "@/public/svgs/common/left-arrow.svg";

const Mypage = () => {
  const router = useRouter();
  const sections = getSections(router);

  return (
    <div>
      {/*헤더*/}
      <TitleHeader title="마이페이지" />
      {/*바디 */}
      <div className="scrollbar-hide overflow-auto pb-[62px]">
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
              <div className="flex h-6 w-6 items-center justify-center p-[2px]">
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
          {sections.map((section: SectionData, index) => (
            <div key={section.label}>
              <Section label={section.label} items={section.items} />
              {index !== sections.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
