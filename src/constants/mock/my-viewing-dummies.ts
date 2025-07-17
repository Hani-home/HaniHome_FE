import dayjs from "dayjs";

import { ViewingCardItem } from "@/types/viewing";

const now = dayjs();

export const mockViewings: ViewingCardItem[] = [
  {
    id: 1,
    memberId: 1,
    propertyId: 9,
    meetingDay: now.add(3, "day").hour(14).minute(0).second(0).format(), // 3일 후
    status: "REQUESTED",
    cancelReason: null,
    photoUrls: ["/svgs/common/room-img.svg"],
    memo: null,
    optionItemNames: [],
    userType: "guest",
    nickname: "상대닉네임",
  },
  {
    id: 2,
    memberId: 1,
    propertyId: 9,
    meetingDay: now.add(3, "day").hour(16).minute(30).second(0).format(), // 5일 후
    status: "REQUESTED",
    cancelReason: null,
    photoUrls: ["/svgs/common/room-img.svg"],
    memo: null,
    optionItemNames: [],
    userType: "guest",
    nickname: "상대닉네임",
  },
  {
    id: 3,
    memberId: 1,
    propertyId: 9,
    meetingDay: now.add(7, "day").hour(11).minute(0).second(0).format(), // 7일 후
    status: "REQUESTED",
    cancelReason: null,
    photoUrls: ["/svgs/common/room-img.svg"],
    memo: null,
    optionItemNames: [],
    userType: "host",
    nickname: "상대닉네임",
  },
  {
    id: 4,
    memberId: 1,
    propertyId: 9,
    meetingDay: now.add(10, "day").hour(10).minute(0).second(0).format(), // 10일 후
    status: "CANCELLED",
    cancelReason: "string",
    photoUrls: ["/svgs/common/room-img.svg"],
    memo: null,
    optionItemNames: ["인터넷비"],
    userType: "guest",
    nickname: "상대닉네임",
  },
  {
    id: 5,
    memberId: 1,
    propertyId: 5,
    meetingDay: now.add(14, "day").hour(15).minute(0).second(0).format(), // 14일 후
    status: "CANCELLED",
    cancelReason: "시간 변경으로 인한 취소 요청",
    photoUrls: ["/svgs/common/room-img.svg"],
    memo: null,
    optionItemNames: ["수도세", "전기세"],
    userType: "guest",
    nickname: "상대닉네임",
  },
];
