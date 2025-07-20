export const QUESTION_MAP = {
  SHARE: {
    ListingDetails: [
      {
        id: "propertyType",
        label: "매물 유형을 선택해주세요",
        options: ["마스터 룸", "거실 쉐어", "세컨드 룸"],
      },
      {
        id: "capacityPeople",
        label: "최대 몇 명이 쓸 수 있나요?",
        options: ["독방", "2인 1실", "3인 1실", "n인 1실"],
      },
      {
        id: "internalDetails",
        label: "매물 정보를 입력해주세요",
        options: [
          "Internal Area",
          "Total Area",
          "총 거주인",
          "욕실 쉐어자 수",
          "건물 전체 층 (선택)",
          "해당 층 (선택)",
        ],
      },
      {
        id: "highlights",
        label: "이 매물 장점은 무엇인가요?",
        options: [
          "전망이 좋아요",
          "햇빛이 잘 들어요",
          "교통이 편리해요",
          "주변보다 저렴해요",
          "테라스가 있어요",
          "집 상태가 깨끗해요",
          "방음이 잘돼요",
          "치안이 좋아요",
          "주변 편의시설이 많아요",
          "커뮤니티 시설이 좋아요",
        ],
      },
      {
        id: "furniture",
        label: "기본 제공 가전, 가구를 선택해주세요",
        options: {
          침실: ["침대 프레임", "책상", "침구류", "옷장", "수납장", "의자"],
          주방: ["전자렌지", "냉장고", "가스렌지", "식기류", "조리도구"],
          거실: ["TV", "소파", "커피테이블"],
          기타: ["Wifi", "청소기", "에어콘", "엘레베이터"],
        },
      },
    ],
    MovingConditions: [],
    ContractTerms:[],
  },

  RENT: {
    ListingDetails: [
      {
        id: "propertyType",
        label: "매물 유형을 선택해주세요",
        options: [
          "하우스",
          "아파트",
          "유닛",
          "스튜디오",
          "그래니 플랫",
          "타운하우스",
        ],
      },
      {
        id: "capacityPeople",
        label: "최대 몇 명이 쓸 수 있나요?",
        options: ["1명", "2명", "3명", "4명", "기타 (5명 이상)"],
      },
      {
        id: "internalDetails",
        label: "매물 정보를 입력해주세요",
        options: [
          "Internal Area",
          "Total Area",
          "방 개수",
          "욕실 개수",
          "건물 전체 층 (선택)",
          "해당 층 (선택)",
        ],
      },
      {
        id: "isBrokered",
        label: "부동산 중개 여부를 알려주세요",
        options: ["부동산 중개", "개인 임대"],
      },
      {
        id: "highlights",
        label: "이 매물 장점은 무엇인가요?",
        options: [
          "전망이 좋아요",
          "햇빛이 잘 들어요",
          "교통이 편리해요",
          "주변보다 저렴해요",
          "테라스가 있어요",
          "집 상태가 깨끗해요",
          "방음이 잘돼요",
          "치안이 좋아요",
          "주변 편의시설이 많아요",
          "커뮤니티 시설이 좋아요",
        ],
      },
      {
        id: "furniture",
        label: "기본 제공 가전, 가구를 선택해주세요",
        options: {
          침실: ["침대 프레임", "책상", "침구류", "옷장", "수납장", "의자"],
          주방: ["전자렌지", "냉장고", "가스렌지", "식기류", "조리도구"],
          거실: ["TV", "소파", "커피테이블"],
          기타: ["Wifi", "청소기", "에어콘", "엘레베이터"],
        },
      },
    ],
    MovingConditions: [],
    ContractTerms:[],
  },
};
