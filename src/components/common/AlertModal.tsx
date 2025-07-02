import ModalLayout from "@/components/common/ModalLayout";

import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

interface AlertModalProps {
  title: string;
  description: React.ReactNode;
  onClose: () => void;
  actionLabel?: string;
  onActionClick?: () => void;
  actionDisabled?: boolean;
  loading?: boolean;
}

const AlertModal = ({
  title,
  description,
  onClose,
  actionLabel,
  onActionClick,
  actionDisabled,
  loading,
}: AlertModalProps) => {
  return (
    <ModalLayout closeButtonColor="text-gray-400" onClose={onClose}>
      <div className="mb-4 flex flex-col items-center gap-3">
        <AlertIcon className="h-6 w-6" />
        <span className="text-body1-sb text-red">{title}</span>
      </div>

      <div className="text-body2-med text-center leading-[1.5] text-gray-700">
        {Array.isArray(description)
          ? description.map((line, idx) => <p key={idx}>{line}</p>)
          : description}
      </div>

      {actionLabel && (
        <button
          onClick={onActionClick}
          disabled={actionDisabled || loading}
          className={`text-lab1-b mt-6 flex h-9 w-full items-center justify-center rounded text-white ${
            actionDisabled || loading
              ? "cursor-not-allowed bg-gray-300"
              : "bg-mint cursor-pointer"
          }`}
        >
          {/* {loading ? <Spinner size={16} /> : actionLabel} */}
        </button>
      )}
    </ModalLayout>
  );
};

export default AlertModal;
