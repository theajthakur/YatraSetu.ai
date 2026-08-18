"use client";

import { useState } from "react";
import { Compass, Lightbulb, MapPin, Navigation } from "lucide-react";
import { fetchTripSummary, TripSummary } from "@/app/api/gemini/gemini";

interface TripSummaryCardProps {
  destination: string;
  days: string | number;
  interests: string;
  language: string;
}

function TripSummarySkeleton() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-primary-200 bg-white shadow-xs animate-pulse space-y-3 min-h-[140px] flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-primary-200 rounded" />
        <div className="h-4 bg-primary-200 rounded w-1/3" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-primary-200/70 rounded w-full" />
        <div className="h-3 bg-primary-200/70 rounded w-11/12" />
        <div className="h-3 bg-primary-200/70 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function TripSummaryCard({
  destination,
  days,
  interests,
  language,
}: TripSummaryCardProps) {
  const [summary, setSummary] = useState<TripSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleFetchSummary = async () => {
    setHasTriggered(true);
    setLoading(true);
    try {
      const data = await fetchTripSummary({
        destination,
        days,
        interests,
        language,
      });
      setSummary(data);
    } catch (err) {
      console.warn("Error fetching trip summary:", err);
    } finally {
      setLoading(false);
    }
  };

  // State 1: Before button click (static prompt + button, zero auto-fetch on mount)
  if (!hasTriggered) {
    return (
      <div className="p-5 sm:p-6 rounded-2xl border border-primary-200/90 bg-gradient-to-br from-white via-primary-100/30 to-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 min-h-[120px]">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-primary-700 font-bold text-sm">
            <Compass className="w-5 h-5 text-primary-600" />
            <span className="font-display text-base text-secondary-900">
              Trip Overview & Insights
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-600">
            Get an AI overview of your trip to {destination} ({days} {Number(days) === 1 ? "day" : "days"}, {interests}).
          </p>
        </div>

        <button
          type="button"
          onClick={handleFetchSummary}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Get Trip Summary</span>
        </button>
      </div>
    );
  }

  // State 2: Quiet loading placeholder after click
  if (loading) {
    return <TripSummarySkeleton />;
  }

  if (!summary) return null;

  // State 3: Resolved summary + nearby recommendations
  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-primary-200/90 bg-gradient-to-br from-white via-primary-100/30 to-white shadow-sm space-y-4 min-h-[120px]">
      <div className="flex items-center justify-between border-b border-primary-200/60 pb-3">
        <div className="flex items-center gap-2 text-primary-700 font-bold text-sm">
          <Compass className="w-5 h-5 text-primary-600" />
          <span className="font-display text-base text-secondary-900">
            Trip Overview & Vibe
          </span>
        </div>
        <span className="text-xs text-secondary-600 font-medium">
          Personalized AI Overview
        </span>
      </div>

      <p className="text-xs sm:text-sm text-secondary-800 leading-relaxed">
        {summary.overview}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-xl border border-primary-200/70 bg-white/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-secondary-900">
            <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
            <span>General Atmosphere</span>
          </div>
          <p className="text-xs text-secondary-700 leading-relaxed">
            {summary.vibe}
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-primary-200/70 bg-white/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-secondary-900">
            <Lightbulb className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Practical Travel Advice</span>
          </div>
          <p className="text-xs text-secondary-700 leading-relaxed">
            {summary.practical_tips}
          </p>
        </div>
      </div>

      {/* Nearby Recommendations */}
      {summary.nearby_recommendations && summary.nearby_recommendations.length > 0 && (
        <div className="pt-2 border-t border-primary-200/60 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-secondary-900">
            <Navigation className="w-3.5 h-3.5 text-primary-600" />
            <span>Nearby Recommendations & Highlights</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {summary.nearby_recommendations.map((rec, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-md bg-white border border-primary-200 text-secondary-800 font-medium shadow-2xs"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
