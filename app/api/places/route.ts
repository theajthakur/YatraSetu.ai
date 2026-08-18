import { NextResponse } from "next/server";

export interface PlaceSuggestion {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("input")?.trim() || "";

    if (!input || input.length < 2) {
      return NextResponse.json({ success: true, predictions: [] });
    }

    const apiKey = process.env.GOOGLE_PLACE_API;

    if (!apiKey) {
      console.warn("GOOGLE_PLACE_API key is not defined in environment.");
      return NextResponse.json({
        success: false,
        predictions: [],
        error: "Server configuration missing GOOGLE_PLACE_API key",
      });
    }

    // Call Google Places Autocomplete API server-side
    const googleUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${apiKey}&components=country:in`;

    const response = await fetch(googleUrl);

    if (!response.ok) {
      console.error("Google Places API HTTP Error:", response.status);
      return NextResponse.json({
        success: false,
        predictions: [],
        error: `Google Places HTTP status ${response.status}`,
      });
    }

    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.warn(
        "Google Places API returned status:",
        data.status,
        data.error_message
      );
    }

    const predictions: PlaceSuggestion[] = (data.predictions || []).map(
      (item: any) => ({
        place_id: item.place_id,
        description: item.description,
        main_text: item.structured_formatting?.main_text || item.description,
        secondary_text: item.structured_formatting?.secondary_text || "",
      })
    );

    return NextResponse.json({
      success: true,
      predictions,
    });
  } catch (error: any) {
    console.error("Error in /api/places route handler:", error);
    return NextResponse.json({
      success: false,
      predictions: [],
      error: error.message || "Internal Server Error",
    });
  }
}
