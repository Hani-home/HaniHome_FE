import { useCallback, useEffect, useState } from "react";

/**
 * 키보드 방향키 및 Enter로 목록 항목을 제어할 수 있는 훅
 * listLength: 현재 렌더링된 목록의 길이
 * onSelect: 선택 시 실행할 함수 (Enter 누를 때 호출됨)
 */

const useKeyboardNavigation = (
  listLength: number,
  onSelect: (index: number) => void,
) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        setHighlightedIndex(prev => Math.min(prev + 1, listLength - 1));
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        onSelect(highlightedIndex);
      }
    },
    [highlightedIndex, listLength, onSelect],
  );

  useEffect(() => {
    if (highlightedIndex >= listLength) {
      setHighlightedIndex(listLength - 1);
    }
  }, [listLength, highlightedIndex]);

  return { highlightedIndex, setHighlightedIndex, handleKeyDown };
};

export default useKeyboardNavigation;
