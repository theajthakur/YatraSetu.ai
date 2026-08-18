import { NextResponse } from "next/server";
import {
  PlaceInsight,
  TripSummary,
  FALLBACK_INSIGHTS,
  FALLBACK_TRIP_SUMMARY,
} from "./gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type = "place_insight",
      placeName = "Heritage Site",
      destination = "Varanasi",
      location = "India",
      interests = "Heritage, Spiritual",
      days = "2",
      language = "English",
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in environment.");
      const fallback =
        type === "trip_summary"
          ? FALLBACK_TRIP_SUMMARY
          : FALLBACK_INSIGHTS.default;
      return NextResponse.json({
        success: false,
        data: fallback,
        error: "Missing API Key",
      });
    }

    const serverNow = new Date();
    const formattedDate = serverNow.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = serverNow.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let systemPrompt = "";

    if (type === "generate_full_itinerary") {
      systemPrompt = `You are YatraSetu AI, an expert travel planner for India.
Generate a structured JSON day-by-day itinerary for a traveler visiting "${destination}" for ${days} days with interests in "${interests}".

OUTPUT FORMAT REQUIREMENT:
Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "destination": "${destination}",
  "tagline": "1-line catchy tagline for ${destination}",
  "days": [
    {
      "dayNumber": 1,
      "title": "Short title for Day 1 theme",
      "stops": [
        {
          "id": "d1-s1",
          "name": "Real monument/place name in ${destination}",
          "timeSlot": "09:00 AM - 11:30 AM",
          "description": "1-sentence plain language description of what to see or do.",
          "crowdLevel": "Low crowd",
          "crowdStatus": "low",
          "category": "Heritage"
        },
        {
          "id": "d1-s2",
          "name": "Real food/cultural stop in ${destination}",
          "timeSlot": "01:30 PM - 04:00 PM",
          "description": "1-sentence description.",
          "crowdLevel": "Moderate crowd",
          "crowdStatus": "moderate",
          "category": "Food"
        }
      ]
    }
  ]
}`;
    } else if (type === "trip_summary") {
      const isHindi = language.toLowerCase().includes("hindi");

      systemPrompt = `You are YatraSetu AI, an empathetic Indian travel advisor.
Generate a highly specific, relatable 3-4 sentence trip summary for a traveler visiting ${destination}.

TRIP PARAMETERS:
- Destination: "${destination}" (Name ${destination} directly in the summary!)
- Duration: ${days} days (Tailor pacing language specifically for a ${days}-day visit: e.g. express vs relaxed pace)
- Traveler Interests: "${interests}" (Directly focus content on ${interests}; e.g. if Heritage/Spiritual, emphasize sacred temples/monuments, not generic tourism)
- Current Date/Season: ${formattedDate}
- Response Language: ${isHindi ? "HINDI (Write all output values fully in authentic Hindi text)" : "ENGLISH"}

OUTPUT FORMAT REQUIREMENT:
Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "overview": "3-4 sentence relatable, non-generic summary naming ${destination}, explicitly tailored to a ${days}-day trip focusing on ${interests}.",
  "vibe": "1-2 sentence description of the general vibe and atmosphere of ${destination}.",
  "practical_tips": "1-2 practical tips based on ${days} days duration and season (${formattedDate}).",
  "nearby_recommendations": [
    "3 short specific nearby places or activities in/around ${destination}"
  ]
}`;
    } else {
      systemPrompt = `You are YatraSetu AI, an expert heritage and travel advisor for India.
Generate structured JSON insights for a traveler visiting the following destination.

CURRENT SERVER CONTEXT:
- Date: ${formattedDate}
- Time: ${formattedTime}

TRIP & PLACE CONTEXT:
- Place Name: "${placeName}"
- Location: "${location}"
- Traveler Interests: "${interests}"
- Trip Duration: ${days} days
- Language Preference: "${language}"

OUTPUT FORMAT REQUIREMENT:
Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "summary": "2-3 sentence concise overview of the place in plain simple language.",
  "hospitality": "1-2 sentences on how locals/vendors typically treat visitors and general safety/friendliness tone.",
  "crowd_suggestion": "short text suggesting best time to visit based on current date/season (e.g. Less crowded in early morning or Peak season — expect more visitors)."
}`;
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API HTTP Error:", response.status, errText);
      const fallback =
        type === "trip_summary"
          ? FALLBACK_TRIP_SUMMARY
          : FALLBACK_INSIGHTS.default;
      return NextResponse.json({
        success: false,
        data: fallback,
        error: `Gemini HTTP ${response.status}`,
      });
    }

    const jsonResult = await response.json();
    const responseText =
      jsonResult?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      const fallback =
        type === "trip_summary"
          ? FALLBACK_TRIP_SUMMARY
          : FALLBACK_INSIGHTS.default;
      return NextResponse.json({
        success: false,
        data: fallback,
        error: "Empty response from Gemini API",
      });
    }

    let parsedData: any;
    try {
      const cleanedText = responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.warn("Failed to parse Gemini JSON output:", responseText);
      parsedData =
        type === "trip_summary"
          ? FALLBACK_TRIP_SUMMARY
          : FALLBACK_INSIGHTS.default;
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error in Gemini API route handler:", error);
    return NextResponse.json({
      success: false,
      data: FALLBACK_TRIP_SUMMARY,
      error: error.message || "Internal Server Error",
    });
  }
}
