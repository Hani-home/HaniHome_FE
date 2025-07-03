import CertificatedBadge from "@/public/svgs/common/certificated-icon.svg";

const ApproveModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(72,74,79,0.6)]">
      <div className="flex h-28 w-[343px] flex-col items-center justify-center gap-3 rounded-[8px] border border-gray-500 bg-white p-4">
        <div className="flex items-center justify-center p-[3px]">
          <CertificatedBadge className="h-[18px] w-[18px]" />
        </div>
        <div className="text-mint-contrast text-body1-sb text-center">
          인증 신청이 완료되었어요. <br /> 관리자가 곧 승인해드릴게요.
        </div>
      </div>
    </div>
  );
};
export default ApproveModal;
