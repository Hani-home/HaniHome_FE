"use client";

import { useEffect, useRef, useState } from "react";

import { axiosInstance } from "@/apis/axios";

import SearchIcon from "@/public/svgs/signup/search-icon.svg";

interface GooglePlacesResponse {
  suggestions: {
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
    };
  }[];
}

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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const isSelectedRef = useRef(false); // 선택 상태를 추적

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlaces = async () => {
      if (!value.trim() || isSelectedRef.current) {
        setResults([]);
        return;
      }

      const body = {
        input: value,
        includedRegionCodes: ["au"],
        includedPrimaryTypes: ["(regions)"],
        locationBias: {
          circle: {
            center: {
              latitude: -33.8688,
              longitude: 151.2093,
            },
            radius: 20000.0,
          },
        },
      };

      try {
        const res = await axiosInstance.post(
          "https://places.googleapis.com/v1/places:autocomplete",
          body,
          {
            headers: {
              "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
              "X-Goog-FieldMask":
                "suggestions.placePrediction.text.text,suggestions.placePrediction.placeId",
            },
            signal: controller.signal,
          },
        );

        const data = res.data as GooglePlacesResponse;

        const suggestions =
          data.suggestions
            ?.map(s => s.placePrediction)
            ?.filter(Boolean)
            ?.map(p => ({
              placeId: p.placeId,
              text: p.text.text,
            })) || [];

        setResults(suggestions);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Autocomplete fetch error:", err);
      }
    };

    const debounce = setTimeout(fetchPlaces, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [value]);

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
              isSelectedRef.current = false; //  입력 시작 → 선택 해제
              onChange(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "ArrowDown") {
                setHighlightedIndex(prev =>
                  Math.min(prev + 1, results.length - 1),
                );
              } else if (e.key === "ArrowUp") {
                setHighlightedIndex(prev => Math.max(prev - 1, 0));
              } else if (e.key === "Enter") {
                if (highlightedIndex >= 0 && results[highlightedIndex]) {
                  isSelectedRef.current = true;
                  onChange(results[highlightedIndex].text);
                  setResults([]);
                  setHighlightedIndex(-1);
                }
              }
            }}
          />
          <SearchIcon className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2" />
        </div>

        {results.length > 0 && (
          <div className="relative z-10 mt-[-2px] w-full rounded-sm rounded-t-none border border-gray-500 bg-white">
            <ul className="flex flex-col">
              {results.map((r, index) => (
                <li
                  key={r.placeId}
                  onClick={() => {
                    isSelectedRef.current = true; //  선택 시 true로 설정
                    onChange(r.text);
                    setResults([]);
                    setHighlightedIndex(-1);
                  }}
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
