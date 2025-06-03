import ModalLayout from "@/components/common/ModalLayout";

import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

interface AlertModalProps {
  title: string;
  description: React.ReactNode;
  onClose: () => void;
}

const AlertModal = ({ title, description, onClose }: AlertModalProps) => {
  return (
    <ModalLayout onClose={onClose}>
      <div className="mb-4 flex flex-col items-center gap-3">
        <AlertIcon className="h-6 w-6" />
        <span className="text-body1-sb text-red">{title}</span>
      </div>
      <div className="text-body2-med text-center leading-[1.5] text-gray-700">
        {description}
      </div>
    </ModalLayout>
  );
};

export default AlertModal;
