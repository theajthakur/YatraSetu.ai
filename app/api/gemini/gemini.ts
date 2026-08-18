export interface PlaceInsight {
  summary: string;
  hospitality: string;
  crowd_suggestion: string;
}

export interface FetchInsightParams {
  placeName: string;
  location?: string;
  interests?: string;
  days?: string | number;
  language?: string;
}

export interface TripSummary {
  overview: string;
  vibe: string;
  practical_tips: string;
}

export interface FetchTripSummaryParams {
  destination: string;
  days: string | number;
  interests: string;
  language: string;
}

export const FALLBACK_INSIGHTS: Record<string, PlaceInsight> = {
  default: {
    summary:
      "A prominent heritage destination rich in historic architecture and local cultural traditions.",
    hospitality:
      "Locals and shopkeepers are generally welcoming to travelers. Standard safety precautions apply.",
    crowd_suggestion:
      "Early mornings (06:00 AM - 08:30 AM) offer the most peaceful experience with lighter crowds.",
  },
};

export const FALLBACK_TRIP_SUMMARY: TripSummary = {
  overview:
    "Expect an immersive cultural journey combining ancient architectural landmarks, sacred riverfront ghats, and vibrant local bazaars. Over your stay, you will experience the living heritage and spiritual essence of the region at a comfortable pace.",
  vibe:
    "The atmosphere is deeply spiritual, historic, and bustling with local market energy.",
  practical_tips:
    "Carry comfortable walking footwear for heritage alleyways and wear lightweight cotton clothing suitable for daytime exploration.",
};

export async function fetchPlaceInsights(
  params: FetchInsightParams
): Promise<PlaceInsight> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "place_insight", ...params }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const json = await response.json();
    if (json.data && json.data.summary) {
      return json.data as PlaceInsight;
    }

    return FALLBACK_INSIGHTS.default;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Failed to fetch Gemini place insights, using fallback:", error);
    return FALLBACK_INSIGHTS.default;
  }
}

export async function fetchTripSummary(
  params: FetchTripSummaryParams
): Promise<TripSummary> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "trip_summary", ...params }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const json = await response.json();
    if (json.data && json.data.overview) {
      return json.data as TripSummary;
    }

    return FALLBACK_TRIP_SUMMARY;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Failed to fetch Gemini trip summary, using fallback:", error);
    return FALLBACK_TRIP_SUMMARY;
  }
}
