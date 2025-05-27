"use client";

import { useEffect, useRef, useState } from "react";

import { fetchPlaceSuggestions } from "@/apis/googlePlaces";

import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";

import SearchIcon from "@/public/svgs/signup/search-icon.svg";

interface PlacePrediction {
  placeId: string;
  text: string;
}

interface SearchFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder = "소문자, 영어로 입력해주세요",
}: SearchFieldProps) => {
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const isSelectedRef = useRef(false);

  const { highlightedIndex, setHighlightedIndex, handleKeyDown } =
    useKeyboardNavigation(results.length, index => {
      handleSelect(results[index].text);
    });

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlaces = async () => {
      if (!value.trim() || isSelectedRef.current) {
        setResults([]);
        return;
      }

      const suggestions = await fetchPlaceSuggestions(value, controller.signal);
      setResults(suggestions);
    };

    const debounce = setTimeout(fetchPlaces, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [value]);

  const handleSelect = (text: string) => {
    isSelectedRef.current = true;
    onChange(text);
    setResults([]);
    setHighlightedIndex(-1);
  };

  return (
    <div className="flex w-full flex-col gap-2 py-3">
      <label className="text-body1-sb text-gray-900">관심 지역 검색</label>

      <div className="flex max-w-[343px] flex-col">
        <div className="relative w-full">
          <input
            className="text-body1-med h-[44px] w-full rounded-sm border border-gray-600 px-4 py-3 pr-12 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={e => {
              isSelectedRef.current = false;
              onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2" />
        </div>

        {results.length > 0 && (
          <div className="relative z-10 mt-[-2px] w-full rounded-sm rounded-t-none border border-gray-500 bg-white">
            <ul className="flex flex-col">
              {results.map((r, index) => (
                <li
                  key={r.placeId}
                  onClick={() => handleSelect(r.text)}
                  className={`text-body1-med cursor-pointer truncate px-4 py-2 text-gray-700 ${
                    index === highlightedIndex
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {r.text}
                </li>
              ))}
            </ul>
            <div className="px-4 pb-2 text-right text-[6.625px] text-gray-700">
              powered by google
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchField;
