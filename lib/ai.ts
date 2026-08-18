import { DestinationItinerary } from "@/lib/mockItineraries";

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
  nearby_recommendations?: string[];
}

export interface FetchTripSummaryParams {
  destination: string;
  days: string | number;
  interests: string;
  language: string;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL_BACKEND ||
  process.env.BASE_URL_BACKEND ||
  "http://localhost:8000";

const API_TIMEOUT_MS = 25000;

export async function fetchPlaceInsights(
  params: FetchInsightParams
): Promise<PlaceInsight> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_URL}/gemini/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "place_insight", ...params }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok || json.success === false) {
      throw new Error(
        json.error || `Python server (8000) responded with status: ${response.status}`
      );
    }

    const data = json.data || json;

    if (data && (data.summary || data.overview)) {
      return data as PlaceInsight;
    }

    throw new Error("Invalid insight payload returned from Python backend");
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out connecting to Python backend (http://localhost:8000).");
    }
    console.error("Failed to fetch Python backend place insights:", error);
    throw error;
  }
}

export async function fetchTripSummary(
  params: FetchTripSummaryParams
): Promise<TripSummary> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_URL}/gemini/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "trip_summary", ...params }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok || json.success === false) {
      throw new Error(
        json.error || `Python server (8000) responded with status: ${response.status}`
      );
    }

    const data = json.data || json;

    if (data && (data.overview || data.summary)) {
      return data as TripSummary;
    }

    throw new Error("Invalid trip summary payload returned from Python backend");
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out connecting to Python backend (http://localhost:8000).");
    }
    console.error("Failed to fetch Python backend trip summary:", error);
    throw error;
  }
}

export async function fetchDynamicItinerary(
  destination: string,
  days: string | number = 2,
  interests: string = "Heritage, Culture"
): Promise<DestinationItinerary> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_URL}/gemini/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "generate_full_itinerary",
        destination,
        days,
        interests,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok || json.success === false) {
      throw new Error(
        json.error || `Python server (8000) responded with status: ${response.status}`
      );
    }

    const data = json.data || json;

    if (data && data.destination && data.days) {
      return data as DestinationItinerary;
    }

    throw new Error("Invalid dynamic itinerary payload returned from Python backend");
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out connecting to Python backend (http://localhost:8000).");
    }
    console.error("Failed to fetch Python backend dynamic itinerary:", error);
    throw error;
  }
}
