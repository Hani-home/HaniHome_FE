import { Dispatch, SetStateAction } from "react";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

interface UploadMultipleImageParams<T extends string = string> {
  file: File;
  setPreviewUrls: Dispatch<SetStateAction<string[]>>;
  setUploadedFiles: Dispatch<SetStateAction<File[]>>;
  setField: (key: T, value: File[]) => void;
  fieldName: T;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  onUpload?: (file: File) => void;
}

export const uploadMultipleImages = <T extends string = string>({
  file,
  setPreviewUrls,
  setUploadedFiles,
  setField,
  fieldName,
  setShowErrorModal,
  onUpload,
}: UploadMultipleImageParams<T>) => {
  const isValidType = ALLOWED_TYPES.includes(file.type);
  const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

  if (!isValidType || !isValidSize) {
    setShowErrorModal(true);
    return;
  }

  const url = URL.createObjectURL(file);

  setPreviewUrls(prev => {
    const next = [...prev, url];
    return next.length > 2 ? next.slice(-2) : next;
  });

  setUploadedFiles(prev => {
    const next = [...prev, file];
    const limited = next.length > 2 ? next.slice(-2) : next;
    setField(fieldName, limited);
    return limited;
  });

  onUpload?.(file);
};
