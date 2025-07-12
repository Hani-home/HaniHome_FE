import { useSearchParams } from "next/navigation";

const steps = [
  { key: "AddressPhoto", label: "주소와 사진" },
  { key: "ListingDetail", label: "매물 상세" },
  { key: "MovingCondition", label: "입주 조건" },
  { key: "ContractTerms", label: "계약 사항" },
];
const FunnelStepMenu = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step");
  
  return (
    <div className="flex items-center justify-center gap-6 px-4 py-2">
      {steps.map(({ key, label }) => {
        const isActive = currentStep === key;

        return (
          <div
            key={key}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-mint" : "text-gray-400"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-mint" : "bg-gray-400"
              }`}
            />
            <div className="text-cap1-b">{label}</div>
          </div>
        );
      })}
    </div>
  );
};
export default FunnelStepMenu;
