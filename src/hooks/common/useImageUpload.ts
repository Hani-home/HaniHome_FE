import { useState } from "react";

import { PresignedUrlResponse } from "@/apis/s3Upload";

interface UseImageUploadProps {
  maxImageCount: number;
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  getPresignedUrls: (
    fileExtensions: string[],
  ) => Promise<PresignedUrlResponse[]>;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const useImageUpload = ({
  maxImageCount,
  setPreviewUrls,
  setUploadedFiles,
  getPresignedUrls,
  setShowErrorModal,
}: UseImageUploadProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    previewUrls: string[],
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const totalCount = previewUrls.length + files.length;
    if (totalCount > maxImageCount) {
      setAlertMessage(
        `이미지는 최대 ${maxImageCount}장까지 업로드할 수 있어요.`,
      );
      e.target.value = "";
      return;
    }

    try {
      const fileExtensions = Array.from(files).map(
        file => file.type.split("/")[1],
      );
      const presignedUrls = await getPresignedUrls(fileExtensions); // External API call

      const uploadPromises = Array.from(files).map(async (file, index) => {
        const presignedUrl = presignedUrls[index];
        const response = await fetch(presignedUrl.presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload image: ${file.name}`);
        }

        setPreviewUrls(prev => [...prev, presignedUrl.fileUrl]);
        setUploadedFiles(prev => [...prev, file]);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("이미지 업로드 중 에러 발생:", error);
      setShowErrorModal(true);
    }

    e.target.value = "";
  };

  return { handleFileChange, alertMessage };
};

export default useImageUpload;
