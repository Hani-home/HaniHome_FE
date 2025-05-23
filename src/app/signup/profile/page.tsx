"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import InputField from "@/components/signup/InputField";
import DropdownField from "@/components/signup/profile/DropdownField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";
import SearchField from "@/components/signup/profile/SearchField";

const SignupProfilePage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    profileimg: "",
    nickname: "",
    gender: "",
    region: "",
  });

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
    };

  const isFormReady = form.nickname && form.gender && form.region;

  const handleSubmit = () => {
    if (!isFormReady) return;

    // ✅ 여기에 제출 로직
    console.log("회원가입 제출!", form);
    router.push("/signup-complete");
  };

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
      <div className="fixed bottom-0 left-1/2 flex w-[343px] -translate-x-1/2 flex-col">
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
