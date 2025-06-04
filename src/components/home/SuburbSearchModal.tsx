import { useState } from "react";

import ModalLayout from "@/components/common/ModalLayout";
import SearchField from "@/components/common/SearchField";

interface SuburbSearchModalProps {
  onClose: () => void;
  onSelectRegion?: (region: string) => void;
}

const SuburbSearchModal = ({
  onClose,
  onSelectRegion,
}: SuburbSearchModalProps) => {
  const [region, setRegion] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    const trimmed = region.trim();
    if (confirmed && trimmed && onSelectRegion) {
      onSelectRegion(trimmed);
    }
    onClose();
  };

  const handleSearch = () => {
    const trimmed = region.trim();
    if (onSelectRegion && trimmed) onSelectRegion(trimmed);
    onClose();
  };

  return (
    <ModalLayout
      onClose={handleClose}
      className="px-4 py-6"
      closeButtonPosition="top-6 right-4"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-heading2 text-gray-900">Suburb 검색</h2>
      </div>

      <SearchField
        value={region}
        onChange={setRegion}
        isSelected={!!region}
        onSearchClick={handleSearch}
        onConfirm={setConfirmed}
      />
    </ModalLayout>
  );
};

export default SuburbSearchModal;
