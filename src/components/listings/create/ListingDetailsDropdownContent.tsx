import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { QUESTION_MAP } from "@/constants/question-map";

interface ListingDetailDropdownContentProps {
  id: string;
  onSelect: (value: string) => void;
}

const ListingDetailDropdownContent = ({
  id,
  onSelect,
}: ListingDetailDropdownContentProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { listingType } = useListingStore();
  if (!listingType) return null;
  const question = QUESTION_MAP[listingType].ListingDetails.find(
    q => q.id === id,
  );
  if (!question) return null;

  switch (id) {
    case "propertyType":
    case "capacityPeople":
    case "isBrokered": {
      return (
        <ul className="flex flex-col gap-3">
          {(question.options as string[]).map(option => (
            <li
              className={`text-lab1-sb flex w-[343px] cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${selectedOption === option ? "border-mint bg-mint-light text-mint" : "border-gray-600 text-gray-800"}`}
              key={option}
              onClick={() => {
                setSelectedOption(option);
                onSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      );
    }
  }
};
export default ListingDetailDropdownContent;
