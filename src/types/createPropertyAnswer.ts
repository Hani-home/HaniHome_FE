export type AnswerValue =
  | string
  | string[]
  | Record<string, string | string[]>
  | {
      availableFrom: string | null;
      availableTo: string | null;
      immediate: boolean;
      negotiable: boolean;
    };