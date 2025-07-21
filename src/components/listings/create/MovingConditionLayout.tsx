import BottomActionBar from "@/components/common/BottomActionBar";

interface MovingConditionProps {
  onNext: () => void;
  onPrev: () => void;
}
const MovingCondition = ({ onNext }: MovingConditionProps) => {
  return (
    <>
      입주조건wrapper{" "}
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              //Todo: 저장 로직 추가
              console.log("저장");
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: onNext,
            variant: "filled",
          },
        ]}
      />
    </>
  );
};
export default MovingCondition;
