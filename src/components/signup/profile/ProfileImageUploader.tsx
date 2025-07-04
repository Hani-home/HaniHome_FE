"use client";

import { useEffect, useRef, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";
import clsx from "clsx";

import { getProfilePresignedUrl } from "@/apis/s3Upload";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

import ImageAlertModal from "./ImageAlertModal";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ProfileImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { profileImagePreview, setField } = useSignupStore();

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ALLOWED_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setShowErrorModal(true);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setField("profileImagePreview", objectUrl);
    setPreviewUrl(objectUrl);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const { fileUrl } = await getProfilePresignedUrl(ext);
    setField("profileImage", fileUrl);
  };

  // 백버튼 뒤 돌아왔을 때 previewUrl 복구
  useEffect(() => {
    if (profileImagePreview) {
      setPreviewUrl(profileImagePreview);
    }
  }, [profileImagePreview]);

  return (
    <div className="flex flex-col items-center pt-10 pb-12">
      <div
        className={clsx(
          "h-[114px] w-[114px] cursor-pointer overflow-hidden rounded-full bg-white",
          previewUrl ? "border border-gray-600" : "border border-gray-300",
        )}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="프로필"
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

      {showErrorModal && (
        <ImageAlertModal onClose={() => setShowErrorModal(false)} />
      )}
    </div>
  );
};

export default ProfileImageUploader;
