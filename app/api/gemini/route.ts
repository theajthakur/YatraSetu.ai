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

    if (type === "trip_summary") {
      systemPrompt = `You are YatraSetu AI, an expert travel advisor for India.
Generate a structured JSON trip summary overview for a user visiting ${destination}.

SERVER CONTEXT:
- Date: ${formattedDate}
- Time: ${formattedTime}

TRIP PARAMETERS:
- Destination: "${destination}"
- Duration: ${days} days
- Selected Interests: "${interests}"
- Language Preference: "${language}"

OUTPUT FORMAT REQUIREMENT:
Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "overview": "3-4 sentence plain-language overview describing what kind of trip experience to expect for a ${days}-day visit to ${destination} focusing on ${interests}.",
  "vibe": "1-2 sentence description of the general vibe and atmosphere of the destination.",
  "practical_tips": "1-2 practical travel tips based on trip length (${days} days) and current season (${formattedDate})."
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
