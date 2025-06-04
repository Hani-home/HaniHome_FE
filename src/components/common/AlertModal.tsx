import CloseIcon from "@/public/svgs/common/close-icon.svg";
import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

interface AlertModalProps {
  title: string;
  description: React.ReactNode;
  onClose: () => void;
}

const AlertModal = ({ title, description, onClose }: AlertModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative flex w-[343px] flex-col items-center justify-center rounded-lg bg-white p-4 text-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="mb-4 flex flex-col items-center gap-3">
          <AlertIcon className="h-6 w-6" />
          <span className="text-body1-sb text-red">{title}</span>
        </div>

        <div className="text-body2-med leading-[1.5] text-gray-700">
          {description}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
