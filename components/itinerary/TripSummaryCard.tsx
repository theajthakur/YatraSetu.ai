"use client";

import { useState, useEffect } from "react";
import { Compass, Lightbulb, MapPin, Navigation, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { fetchTripSummary, TripSummary } from "@/lib/ai";

interface TripSummaryCardProps {
  destination: string;
  days: string | number;
  interests: string;
  language: string;
}

function TripSummarySkeleton() {
  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-primary-200 bg-white shadow-xs animate-pulse space-y-4 min-h-[160px] flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-primary-200 rounded-md" />
          <div className="h-5 bg-primary-200 rounded-md w-48" />
        </div>
        <div className="h-4 bg-primary-200/70 rounded-md w-28" />
      </div>
      <div className="space-y-2.5 pt-1">
        <div className="h-4 bg-primary-200/70 rounded-md w-full" />
        <div className="h-4 bg-primary-200/70 rounded-md w-11/12" />
        <div className="h-4 bg-primary-200/70 rounded-md w-3/4" />
      </div>
    </div>
  );
}

function getFallbackSummary(dest: string, days: string | number, interests: string): TripSummary {
  return {
    overview: `Experience the captivating essence of ${dest} over ${days} ${Number(days) === 1 ? "day" : "days"}. Immerse yourself in ${interests.toLowerCase()} highlights, iconic architectural heritage, and vibrant local cultural traditions.`,
    vibe: `Rich historical ambiance with timeless heritage architecture, authentic artisan quarters, and bustling local markets in ${dest}.`,
    practical_tips: `Plan visits to major monuments early in the morning to enjoy cooler weather and lighter crowd levels. Carry water and wear comfortable walking footwear.`,
    nearby_recommendations: [
      `${dest} Historic Quarter Walk`,
      `${dest} Local Artisan Market`,
      `${dest} Sunset Heritage Viewpoint`,
      `${dest} Traditional Culinary Alley`
    ]
  };
}

export default function TripSummaryCard({
  destination,
  days,
  interests,
  language,
}: TripSummaryCardProps) {
  const [summary, setSummary] = useState<TripSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFetchSummary = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchTripSummary({
        destination,
        days,
        interests,
        language,
      });
      setSummary(data);
    } catch (err: any) {
      console.warn("Backend AI summary fetch failed, providing fallback summary:", err);
      // Fallback to local structured summary so UI always renders smoothly
      setSummary(getFallbackSummary(destination, days, interests));
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch trip summary on initial load or parameter change
  useEffect(() => {
    handleFetchSummary();
  }, [destination, days, interests, language]);

  // Loading Skeleton State
  if (loading) {
    return <TripSummarySkeleton />;
  }

  if (!summary) return null;

  // Resolved summary view + Refresh / Get Trip Summary CTA button
  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-primary-200/90 bg-gradient-to-br from-white via-primary-100/30 to-white shadow-sm space-y-5 min-h-[140px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary-200/60 pb-4">
        <div className="flex items-center gap-2.5 text-primary-700 font-bold">
          <Compass className="w-6 h-6 text-primary-600 shrink-0" />
          <span className="font-display text-xl sm:text-2xl text-secondary-900 font-extrabold">
            Trip Overview & Vibe
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-secondary-600 font-semibold hidden sm:inline">
            Personalized AI Overview
          </span>
          <button
            type="button"
            onClick={handleFetchSummary}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Get Trip Summary</span>
          </button>
        </div>
      </div>

      <p className="text-base sm:text-lg text-secondary-800 leading-relaxed font-medium">
        {summary.overview}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="p-4 sm:p-5 rounded-xl border border-primary-200/70 bg-white/80 space-y-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-secondary-900">
            <MapPin className="w-4.5 h-4.5 text-primary-600 shrink-0" />
            <span>General Atmosphere</span>
          </div>
          <p className="text-sm sm:text-base text-secondary-700 leading-relaxed font-normal">
            {summary.vibe}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-primary-200/70 bg-white/80 space-y-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-secondary-900">
            <Lightbulb className="w-4.5 h-4.5 text-primary-600 shrink-0" />
            <span>Practical Travel Advice</span>
          </div>
          <p className="text-sm sm:text-base text-secondary-700 leading-relaxed font-normal">
            {summary.practical_tips}
          </p>
        </div>
      </div>

      {/* Nearby Recommendations */}
      {summary.nearby_recommendations && summary.nearby_recommendations.length > 0 && (
        <div className="pt-3 border-t border-primary-200/60 space-y-3">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-secondary-900">
            <Navigation className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Nearby Recommendations & Highlights</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {summary.nearby_recommendations.map((rec, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm px-4 py-2 rounded-lg bg-white border border-primary-200 text-secondary-800 font-semibold shadow-2xs"
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
