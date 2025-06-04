import { GooglePlacesAPIResponse, PlacePrediction } from "@/types/googlePlaces";

export const fetchPlaceSuggestions = async (
  input: string,
  signal?: AbortSignal,
): Promise<PlacePrediction[]> => {
  if (!input.trim()) return [];

  try {
    const res = await fetch("/api/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
      signal,
    });

    const data = (await res.json()) as GooglePlacesAPIResponse;

    return (
      data?.suggestions?.map(s => ({
        placeId: s.placePrediction.placeId,
        text: s.placePrediction.text.text,
      })) ?? []
    );
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "ERR_CANCELED"
    ) {
      return [];
    }

    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name?: string }).name === "AbortError"
    ) {
      return [];
    }

    console.error("Google Autocomplete API Error:", err);
    return [];
  }
};
