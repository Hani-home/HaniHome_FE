import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

interface ImageAlertModalProps {
  onClose: () => void;
}

const ImageAlertModal = ({ onClose }: ImageAlertModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="flex w-[343px] flex-col items-center justify-center rounded-lg bg-white px-6 py-4 text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-3 flex flex-col items-center gap-2">
          <AlertIcon />
          <span className="text-body1-sb text-red">
            등록할 수 없는 이미지입니다
          </span>
        </div>
        <p className="text-body2-med flex-1 leading-[1.5] text-gray-700">
          등록 가능한 이미지는 JPG, PNG 형식이며,
          <br />
          5MB 이하만 등록 가능합니다.
          <br />
          이미지를 다시 한 번 확인해 주세요.
        </p>
      </div>
    </div>
  );
};

export default ImageAlertModal;
