import { axiosInstance } from "./axios";

interface GooglePlacesAPIResponse {
  suggestions: {
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
    };
  }[];
}

export interface PlacePrediction {
  placeId: string;
  text: string;
}

export const fetchPlaceSuggestions = async (
  input: string,
  signal?: AbortSignal,
): Promise<PlacePrediction[]> => {
  if (!input.trim()) return [];

  try {
    const res = await axiosInstance.post(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        input,
        includedRegionCodes: ["au"],
        includedPrimaryTypes: ["(regions)"],
        locationBias: {
          circle: {
            center: { latitude: -33.8688, longitude: 151.2093 },
            radius: 20000,
          },
        },
      },
      {
        headers: {
          "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
          "X-Goog-FieldMask":
            "suggestions.placePrediction.text.text,suggestions.placePrediction.placeId",
        },
        signal,
      },
    );

    const data = res.data as GooglePlacesAPIResponse;

    return data.suggestions.map(s => ({
      placeId: s.placePrediction.placeId,
      text: s.placePrediction.text.text,
    }));
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string; name?: string; message?: string }).code ===
        "ERR_CANCELED"
    ) {
      return [];
    }

    console.error("Google Autocomplete API Error:", err);
    return [];
  }
};
