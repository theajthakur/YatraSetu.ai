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
    "Expect an organic exploration across historical quarter monuments and local markets. Over your stay, you will experience living heritage and authentic regional flavors at a comfortable pace.",
  vibe:
    "Cultural, historic, and welcoming with bustling local market energy.",
  practical_tips:
    "Wear comfortable footwear for heritage walks and carry lightweight cotton clothing.",
  nearby_recommendations: [
    "Local Artisan Craft Market",
    "Riverfront Promenade",
    "Traditional Culinary Walk",
  ],
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

export async function fetchDynamicItinerary(
  destination: string,
  days: string | number = 2,
  interests: string = "Heritage, Culture"
): Promise<DestinationItinerary> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("/api/gemini", {
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

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const json = await response.json();
    if (json.data && json.data.destination && json.data.days) {
      return json.data as DestinationItinerary;
    }

    return createFallbackItinerary(destination, Number(days));
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Failed to fetch Gemini dynamic itinerary, using fallback:", error);
    return createFallbackItinerary(destination, Number(days));
  }
}

function createFallbackItinerary(
  destination: string,
  numDays: number = 2
): DestinationItinerary {
  return {
    destination,
    tagline: `Cultural Exploration & Heritage Discoveries in ${destination}`,
    days: Array.from({ length: Math.max(1, Math.min(numDays, 5)) }).map(
      (_, i) => ({
        dayNumber: i + 1,
        title: `Day ${i + 1}: ${destination} Heritage & Cultural Exploration`,
        stops: [
          {
            id: `${destination.toLowerCase()}-${i + 1}-1`,
            name: `${destination} Central Heritage Square`,
            timeSlot: "09:00 AM - 11:30 AM",
            description: `Explore historic architectural monuments and central heritage walkways of ${destination}.`,
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Heritage",
          },
          {
            id: `${destination.toLowerCase()}-${i + 1}-2`,
            name: `${destination} Local Culinary & Artisan Quarter`,
            timeSlot: "01:30 PM - 04:00 PM",
            description: `Sample regional food specialties and discover local handicrafts in ${destination}.`,
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Food",
          },
        ],
      })
    ),
  };
}
