import { z } from "zod";

export const nicknameSchema = z
  .string()
  .trim()
  .superRefine((nickname, ctx) => {
    const len = nickname.length;

    // 띄어쓰기 금지
    if (/\s/.test(nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "띄어쓰기를 사용할 수 없습니다",
      });
    }

    if (/\p{Emoji}/u.test(nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이모지를 사용할 수 없습니다",
      });
    }

    // 그 다음 특수문자 체크
    if (/[^a-zA-Z0-9\u3131-\u318E\uAC00-\uD7A3]/.test(nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "특수문자를 사용할 수 없습니다",
      });
    }

    // 같은 문자 5번 이상 반복 금지
    if (/(.)\1\1\1\1/.test(nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "같은 글자를 연속 5번 이상 사용할 수 없습니다",
      });
    }

    // 길이 제한
    if (len < 5 || len > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "닉네임을 올바르게 입력해주세요",
      });
    }

    // 사용 가능한 문자만 허용 (한글, 영어, 숫자)
    const allowedChars = /^[a-zA-Z0-9\u3131-\u318E\uAC00-\uD7A3]+$/;
    if (!allowedChars.test(nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "닉네임을 올바르게 입력해주세요",
      });
    }
  });
