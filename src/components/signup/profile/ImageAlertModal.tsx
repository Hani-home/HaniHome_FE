import AlertModal from "@/components/common/AlertModal";

interface ImageAlertModalProps {
  onClose: () => void;
}

const ImageAlertModal = ({ onClose }: ImageAlertModalProps) => {
  return (
    <AlertModal
      title="등록할 수 없는 이미지입니다"
      description={
        <>
          등록 가능한 이미지는 JPG, PNG 형식이며,
          <br />
          5MB 이하만 등록 가능합니다.
          <br />
          이미지를 다시 한 번 확인해 주세요.
        </>
      }
      onClose={onClose}
    />
  );
};

export default ImageAlertModal;
