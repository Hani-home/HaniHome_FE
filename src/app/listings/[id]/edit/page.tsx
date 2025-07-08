import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import TitleSection from "@/components/listings/detailShow/TitleSection";

const ListingsEdit = () => {
  return (
    <>
      <BackHeader />
      <TitleSection
        title="수정할 정보 섹션을 클릭해주세요"
        label="추가로 변경해야하는 섹션도 수정해주세요"
      />
      <BottomActionBar label="저장"/>
    </>
  );
};
export default ListingsEdit;
