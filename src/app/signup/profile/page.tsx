"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { nicknameSchema } from "@/schemas/nickname";

import InputField from "@/components/common/InputField";
import DropdownField from "@/components/signup/profile/DropdownField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";
import SearchField from "@/components/signup/profile/SearchField";

const SignupProfilePage = () => {
  const router = useRouter();
  const [nicknameMessage, setNicknameMessage] = useState<string | undefined>();

  const setIsChecking = useState(false)[1];

  const [checkResult, setCheckResult] = useState<
    "default" | "available" | "unavailable"
  >("default");

  const [form, setForm] = useState({
    profileimg: "",
    nickname: "",
    gender: "",
    region: "",
  });

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm(prev => ({ ...prev, [key]: value }));

      if (key === "nickname") {
        setCheckResult("default");
        setNicknameMessage(undefined);
      }
    };

  const handleBlur = (key: keyof typeof form) => () => {
    const value = form[key];

    if (key === "nickname") {
      const result = nicknameSchema.safeParse(value);
      if (!result.success) {
        setNicknameMessage(result.error.errors[0].message);
      } else {
        setNicknameMessage(undefined);
      }
    }
  };

  const checkDuplicate = async () => {
    if (nicknameMessage) return;

    setIsChecking(true);
    try {
      const res = await fetch(`/api/check-nickname?value=${form.nickname}`);
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
    if (!isFormReady) return;
    console.log("회원가입 제출!", form);
    router.push("/signup-complete");
  };

  const isSuccess = useMemo(() => checkResult === "available", [checkResult]);
  const isError = useMemo(
    () => checkResult === "unavailable" || checkResult === "default",
    [checkResult],
  );

  const isFormReady = useMemo(
    () =>
      form.nickname &&
      form.gender &&
      form.region &&
      checkResult === "available",
    [form, checkResult],
  );

  return (
    <div className="relative flex h-full flex-col">
      <h1 className="text-heading2 py-3 text-gray-900">
        프로필을 만들어주세요
      </h1>

      <ProfileImageUploader
        onUpload={file => {
          const url = URL.createObjectURL(file);
          setForm(prev => ({ ...prev, profileimg: url }));
        }}
      />

      <InputField
        label="닉네임"
        placeholder="한영문, 숫자로 5 - 12글자"
        value={form.nickname}
        onChange={handleChange("nickname")}
        onBlur={handleBlur("nickname")}
        actionLabel="닉네임 중복 확인"
        actionClickable={form.nickname.trim().length >= 5}
        onActionClick={checkDuplicate}
        errorMessage={isError ? nicknameMessage : undefined}
        successMessage={isSuccess ? nicknameMessage : undefined}
      />

      <DropdownField
        label="성별"
        value={form.gender}
        onChange={val => setForm(prev => ({ ...prev, gender: val }))}
        options={[
          { label: "남성", value: "male" },
          { label: "여성", value: "female" },
        ]}
      />

      <SearchField
        value={form.region}
        onChange={val => setForm(prev => ({ ...prev, region: val }))}
      />

      <div className="fixed bottom-0 left-1/2 flex w-[343px] -translate-x-1/2 flex-col bg-white">
        <div className="w-full border-t border-gray-300" />
        <button
          onClick={handleSubmit}
          disabled={!isFormReady}
          className={`text-heading3 my-2 w-full cursor-pointer rounded py-3 text-white ${
            isFormReady ? "bg-violet" : "cursor-not-allowed bg-gray-300"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default SignupProfilePage;
