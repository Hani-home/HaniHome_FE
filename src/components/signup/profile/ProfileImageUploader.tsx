"use client";

import { useRef, useState } from "react";

import PlusIcon from "@/public/svgs/signup/plus-icon.svg";

interface ProfileImageUploaderProps {
  onUpload?: (file: File) => void;
  initialImageUrl?: string;
}

const ProfileImageUploader = ({
  onUpload,
  initialImageUrl,
}: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요!");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onUpload?.(file);
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-12">
      <div
        className="h-[114px] w-[114px] cursor-pointer overflow-hidden rounded-[57px] border border-gray-300 bg-white"
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlusIcon className="h-6 w-6" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProfileImageUploader;
