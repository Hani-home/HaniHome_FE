"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { validateForm } from "@/utils/validationForm";

import InputField from "@/components/signup/InputField";
import AgreementList from "@/components/signup/info/AgreementList";

import { AgreementTerm } from "@/constants/AgreementTerm";

const SignupInfoPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [agreed, setAgreed] = useState<number[]>([]); // 약관 체크 상태

  const requiredTermIds = AgreementTerm.filter(term =>
    term.label.includes("[필수]"),
  ).map(term => term.id);

  const allRequiredChecked = requiredTermIds.every(id => agreed.includes(id));

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) {
        setErrors(prev => ({ ...prev, [key]: "" }));
      }
    };

  const handleSubmit = () => {
    const newErrors = validateForm(form);
    setErrors(newErrors);

    const isFormValid = !Object.values(newErrors).some(Boolean);
    if (isFormValid && allRequiredChecked) {
      console.log("제출 성공", { ...form, agreed });
      router.push("/signup/profile");
    }
  };

  const isFormReady =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    allRequiredChecked;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 py-3">
        <h1 className="text-heading2 text-gray-900">정보를 입력해주세요</h1>
        <span className="text-cap1-med text-gray-700">
          서비스 이용에 필요한 정보 입력 및 약관에 동의해주세요
        </span>
      </div>
      <InputField
        label="이름"
        placeholder="이름을 입력해주세요"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
      />
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
      />
      <InputField
        label="전화번호"
        placeholder="전화번호를 입력해주세요"
        value={form.phone}
        onChange={handleChange("phone")}
        error={errors.phone}
      />
      <AgreementList onChange={setAgreed} />
      <div className="fixed bottom-0 left-1/2 flex w-[343px] -translate-x-1/2 flex-col">
        <div className="h-[1px] w-full bg-gray-300" />
        <button
          onClick={handleSubmit}
          disabled={!isFormReady}
          className={`text-heading3 my-2 w-full cursor-pointer rounded py-3 text-white ${
            isFormReady ? "bg-violet" : "cursor-not-allowed bg-gray-300"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default SignupInfoPage;
