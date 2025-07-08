export const listingDetails = [
  {
    rentalType: "share",
    details: [
      {
        image: ["/svgs/common/room-img.svg", "/svgs/common/room-img.svg"],
        address: "25 Smith St, Chatswood NSW 2067",
        propertyType: "세컨드 룸",
        propertyDetails: {
          internalArea: "nn",
          totalArea: "nn",
          totalResidents: "nn",
          sharedBathrooms: "nn",
          buildingFloors: "nn",
          floor: "nn",
        },
        maxOccupants: "독방",
        furniture: {
          bedroom: ["침대 프레임", "책상", "침구류", "옷장", "수납장"],
          kitchen: ["전자렌지", "냉동고", "가스렌지", "식기류", "조리도구"],
          livingRoom: ["TV", "소파", "커피테이블"],
          others: ["청소기", "고속인터넷망 Wifi"],
        },
        highlights: [
          "햇빛이 잘 들어요",
          "주변 편의시설이 많아요",
          "전망이 좋아요",
          "주변보다 저렴해요",
          "테라스가 있어요",
        ],
        guestGender: ["무관", "LGBTQ 가능"],
        livingConditions: {
          noticePeriod: "nn",
          minStayDuration: "nn",
          contractType: "월단위계약",
        },
        costs: {
          billsIncluded: false, // false = 빌 미포함, true = 빌 포함
        },
        moveInDates: ["2025-07-08", "즉시입주가능"],
        additionalInfo: {
          smokingAllowed: true,
          petsAllowed: true,
          visitorsAllowed: true,
          parking: ["전용공간", "노상주차"],
          kitchenAccess: true,
        },
        hostDescription:
          "호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명",
      },
    ],
  },
  {
    rentalType: "rent",
    details: [
      {
        image: ["/svgs/common/room-img.svg", "/svgs/common/room-img.svg"],
        address: "25 Smith St, Chatswood NSW 2067",
        propertyType: "유닛",
        propertyDetails: {
          internalArea: "nn",
          totalArea: "nn",
          totalResidents: "nn",
          sharedBathrooms: "nn",
          buildingFloors: "nn",
          floor: "nn",
        },
        isBrokered: true,
        maxOccupants: "3인 1실",
        furniture: {
          bedroom: ["침대 프레임", "책상", "침구류", "옷장", "수납장"],
          kitchen: ["전자렌지", "냉동고", "가스렌지", "식기류", "조리도구"],
          livingRoom: ["TV", "소파", "커피테이블"],
          others: ["청소기", "고속인터넷망 Wifi"],
        },
        highlights: [
          "햇빛이 잘 들어요",
          "주변 편의시설이 많아요",
          "전망이 좋아요",
          "주변보다 저렴해요",
          "테라스가 있어요",
        ],
        guestGender: ["무관", "LGBTQ 가능"],
        livingConditions: {
          noticePeriod: "nn",
          minStayDuration: "nn",
          contractType: "월단위계약",
        },
        costs: {
          billsIncluded: false,
        },
        moveInDates: ["2025-07-08", "즉시입주가능"],
        additionalInfo: {
          smokingAllowed: true,
          petsAllowed: true,
          visitorsAllowed: true,
          parking: ["전용공간", "노상주차"],
          kitchenAccess: true,
        },
        hostDescription:
          "호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명호스트설명",
      },
    ],
  },
];
