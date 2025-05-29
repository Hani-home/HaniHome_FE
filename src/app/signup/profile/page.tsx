"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { nicknameSchema } from "@/schemas/nickname";
import { useSignupStore } from "@/stores/useSignupStore";

import InputField from "@/components/common/InputField";
import DropdownField from "@/components/signup/profile/DropdownField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";
import SearchField from "@/components/signup/profile/SearchField";

const SignupProfilePage = () => {
  const router = useRouter();
  const [nicknameMessage, setNicknameMessage] = useState<string | undefined>();
  const [isValidNickname, setIsValidNickname] = useState(false);

  const setIsChecking = useState(false)[1];

  const [checkResult, setCheckResult] = useState<
    "default" | "available" | "unavailable"
  >("default");

  const { nickname, gender, region, setField } = useSignupStore();
  useEffect(() => {
    if (!nickname) return;

    const result = nicknameSchema.safeParse(nickname);
    setIsValidNickname(result.success);
  }, [nickname]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("nickname", e.target.value);
    setCheckResult("default");
    setNicknameMessage(undefined);
  };

  const handleBlur = () => {
    const result = nicknameSchema.safeParse(nickname);
    if (!result.success) {
      setNicknameMessage(result.error.errors[0].message);
      setIsValidNickname(false);
    } else {
      setNicknameMessage(undefined);
      setIsValidNickname(true);
    }
  };

  const checkDuplicate = async () => {
    if (!isValidNickname) return;

    setIsChecking(true);
    try {
      const res = await fetch(`/api/check-nickname?value=${nickname}`);
      const { available } = await res.json();

      if (available) {
        setNicknameMessage("사용 가능한 닉네임입니다");
        setCheckResult("available");
      } else {
        setNicknameMessage("중복된 닉네임입니다");
        setCheckResult("unavailable");
      }
    } catch {
      setNicknameMessage("중복 확인에 실패했습니다");
      setCheckResult("unavailable");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = () => {
    if (!nickname || !gender || !region) return;

    if (checkResult === "default") {
      setNicknameMessage("닉네임 중복 확인 버튼을 클릭해주세요");
      setCheckResult("unavailable");
      return;
    }

    if (checkResult !== "available") return;

    router.push("/signup-complete");
  };

  const isFormReady = useMemo(
    () => nickname && gender && region && checkResult === "available",
    [nickname, gender, region, checkResult],
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
        onBlur={handleBlur}
        actionLabel="중복 확인"
        actionClickable={isValidNickname}
        onActionClick={checkDuplicate}
        errorMessage={
          checkResult === "unavailable" || checkResult === "default"
            ? nicknameMessage
            : undefined
        }
        successMessage={
          checkResult === "available" ? nicknameMessage : undefined
        }
      />

      <DropdownField
        label="성별"
        value={gender}
        onChange={val => setField("gender", val)}
        options={[
          { label: "남성", value: "male" },
          { label: "여성", value: "female" },
        ]}
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
            isFormReady ? "bg-violet" : "bg-gray-300"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default SignupProfilePage;
