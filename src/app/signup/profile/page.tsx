"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import { useNickname } from "@/hooks/signup/useNickname";

import AlertMessage from "@/components/common/AlertMessage";
import InputField from "@/components/common/InputField";
import DropdownField from "@/components/signup/profile/DropdownField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";
import SearchField from "@/components/signup/profile/SearchField";

const GENDER_OPTIONS = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

const SignupProfilePage = () => {
  const router = useRouter();
  const {
    message,
    isValid,
    isChecking,
    result,
    validate,
    checkDuplicate,
    reset,
  } = useNickname();
  const { nickname, gender, region, setField } = useSignupStore();
  const [alerts, setAlerts] = useState<string[]>([]);

  const showAlert = (message: string) => {
    setAlerts(prev => [...prev, message]);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("nickname", e.target.value);
    reset();
  };

  const handleSubmit = () => {
    if (!isValid || !nickname || !gender || !region) {
      showAlert("모든 항목에 답변해주세요");
      return;
    }
    if (result === "default") {
      showAlert("닉네임 중복 확인 버튼을 눌러주세요");
      return;
    }
    if (result !== "available") return;
    router.push("/signup-complete");
  };

  const isFormReady = useMemo(
    () => nickname && gender && region && result === "available",
    [nickname, gender, region, result],
  );

  return (
    <div className="relative flex h-full flex-col">
      <h1 className="text-heading2 py-4 text-gray-900">
        프로필을 만들어주세요
      </h1>

      <ProfileImageUploader
        onUpload={file => {
          const url = URL.createObjectURL(file);
          setField("profileimg", url);
        }}
      />

      <InputField
        label="닉네임"
        placeholder="한영문, 숫자로 5 - 12글자"
        value={nickname}
        onChange={handleNicknameChange}
        onBlur={() => validate(nickname)}
        actionLabel="중복 확인"
        actionClickable={isValid && !isChecking}
        onActionClick={() => checkDuplicate(nickname)}
        errorMessage={
          result === "unavailable" || result === "default" ? message : undefined
        }
        successMessage={result === "available" ? message : undefined}
      />

      <DropdownField
        label="성별"
        value={gender}
        onChange={val => setField("gender", val)}
        options={GENDER_OPTIONS}
      />

      <SearchField
        value={region}
        onChange={val => setField("region", val)}
        isSelected={!!region}
      />

      <div className="fixed bottom-0 left-1/2 z-20 flex w-[343px] -translate-x-1/2 flex-col bg-white">
        <div className="w-full border-t border-gray-300" />
        <button
          onClick={handleSubmit}
          className={`text-heading3 my-2 w-full cursor-pointer rounded py-3 text-white ${
            isFormReady ? "bg-mint" : "bg-gray-300"
          }`}
        >
          완료
        </button>
      </div>

      {alerts.length > 0 && (
        <AlertMessage
          message={alerts.at(-1)!}
          onDone={() => setAlerts(prev => prev.slice(0, prev.length - 1))}
        />
      )}
    </div>
  );
};

export default SignupProfilePage;
