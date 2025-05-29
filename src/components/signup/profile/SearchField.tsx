"use client";

import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

import clsx from "clsx";

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
  isSelected?: boolean;
}

const SearchField = ({
  value,
  onChange,
  placeholder = "소문자, 영어로 입력해주세요",
  isSelected: isSelectedProp,
}: SearchFieldProps) => {
  const [results, setResults] = useState<PlacePrediction[]>([]);

  const isSelectedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(
    isSelectedProp ?? false,
  );

  useEffect(() => {
    setIsSelected(isSelectedProp ?? false);
  }, [isSelectedProp]);

  const { highlightedIndex, setHighlightedIndex, handleKeyDown } =
    useKeyboardNavigation(results.length, index => {
      handleSelect(results[index].text);
    });

  const fetchPlaces = useCallback(async () => {
    if (!value.trim() || isSelected) {
      setResults([]);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const suggestions = await fetchPlaceSuggestions(value, controller.signal);
      setResults(suggestions);
    } catch {
      // silent fail
    }
  }, [value]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchPlaces();
    }, 300);

    return () => clearTimeout(debounce);
  }, [fetchPlaces]);

  const handleSelect = (text: string) => {
    isSelectedRef.current = true;
    setIsSelected(true);
    onChange(text);
    setResults([]);
    setHighlightedIndex(-1);
  };

  return (
    <div className="flex w-full flex-col gap-2 py-4">
      <label className="text-body1-sb text-gray-800">관심 지역 검색</label>

      <div className="flex max-w-[343px] flex-col">
        <div className="relative w-full">
          <input
            className={clsx(
              "text-body1-med h-[44px] w-full rounded-sm border py-3 placeholder:text-gray-500 focus:outline-none",
              isSelected
                ? "border-gray-600 px-4 text-gray-900"
                : "border-gray-400 pr-12 pl-4 focus:border-gray-900",
            )}
            placeholder={placeholder}
            value={value}
            onChange={e => {
              isSelectedRef.current = false;
              setIsSelected(false);
              onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={fetchPlaces}
            className="absolute top-1/2 -translate-y-1/2"
          >
            {!isSelected && (
              <SearchIcon className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600" />
            )}
          </button>
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
