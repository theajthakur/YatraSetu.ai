import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-3.6-flash";

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
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Missing GEMINI_API_KEY in environment configuration",
        },
        { status: 500 }
      );
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

      systemPrompt = `You are YatraSetu AI, an empathetic Indian cultural travel advisor.
Generate a highly specific, personalized, 3-4 sentence trip overview for a user visiting "${destination}".

MANDATORY REAL-WORLD SPECIFICITY INSTRUCTIONS FOR "${destination}":
1. ALWAYS NAME SPECIFIC REAL LANDMARKS AND AT LEAST ONE LOCALLY FAMOUS FOOD OR CRAFT ITEM FOR "${destination}". DO NOT USE VAGUE GENERIC PHRASES WITHOUT A CONCRETE EXAMPLE ATTACHED.
   - Name 2-3 actual well-known landmarks/monuments specific to "${destination}" (e.g., if Agra: Taj Mahal, Agra Fort, Fatehpur Sikri; if Varanasi: Kashi Vishwanath, Dashashwamedh Ghat, Sarnath; if Jaipur: Amer Fort, Hawa Mahal; if Delhi: Red Fort, Qutub Minar).
   - Mention at least one locally famous food/craft/tradition specific to "${destination}" (e.g., Petha/Bedai for Agra, Banarasi silk/Malaiyyo for Varanasi, Ghevar/Dal Baati for Jaipur).
2. TAILOR TONE & FOCUS TO SELECTED INTERESTS ("${interests}"):
   - If "Heritage" is selected, focus heavily on dynastic history, royal architecture, and ancient stone monuments.
   - If "Spiritual" is selected, focus heavily on sacred chants, holy riverfronts, and temple corridor rituals.
   - If "Food" is selected, focus on street food trails, ancient halwai sweet shops, and local culinary specialties.
   - If "Adventure" is selected, focus on hill fort treks, river cruises, and outdoor exploration.
3. REFLECT PACING FOR A ${days}-DAY VISIT:
   - A short ${days}-day trip must highlight a realistic, non-overwhelming itinerary pace (e.g. focusing on core highlights).
   - A longer trip should mention an easy, relaxed pace allowing off-beat explorations.
4. AVOID GENERIC FILLER:
   - Never use empty phrases like "rich cultural heritage", "vibrant atmosphere", or "popular tourist spots" unless immediately accompanied by a real named landmark or dish.
5. LANGUAGE:
   - ${isHindi ? "Write ALL JSON values fully in authentic Hindi (हिंदी) text." : "Write in clear, engaging English."}

OUTPUT FORMAT REQUIREMENT:
Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "overview": "3-4 sentence specific, personalized overview naming 2-3 real landmarks (e.g., Taj Mahal, Agra Fort) and local food/craft items (e.g., Petha), tailored to ${days} days and ${interests}.",
  "vibe": "1-2 sentence description of the authentic atmosphere of ${destination} with concrete local examples.",
  "practical_tips": "1-2 practical tips based on trip duration (${days} days) and current date/season (${formattedDate}).",
  "nearby_recommendations": [
    "3 real specific nearby attractions, heritage spots, or food bazaars in/around ${destination}"
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

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

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
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Gemini API Error ${response.status}: ${errText}`,
        },
        { status: response.status }
      );
    }

    const jsonResult = await response.json();
    const responseText =
      jsonResult?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Empty response from Gemini API",
        },
        { status: 502 }
      );
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
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Invalid JSON response format from Gemini API",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error in Gemini API route handler:", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
