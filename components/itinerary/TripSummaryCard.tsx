"use client";

import { useEffect, useState } from "react";
import { Compass, Lightbulb, Sparkles, MapPin } from "lucide-react";
import { fetchTripSummary, TripSummary } from "@/app/api/gemini/gemini";

interface TripSummaryCardProps {
  destination: string;
  days: string | number;
  interests: string;
  language: string;
}

function TripSummarySkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-primary-200 bg-white shadow-xs animate-pulse space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-primary-200 rounded" />
        <div className="h-4 bg-primary-200 rounded w-1/3" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-primary-200/70 rounded w-full" />
        <div className="h-3 bg-primary-200/70 rounded w-11/12" />
        <div className="h-3 bg-primary-200/70 rounded w-4/5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="h-10 bg-primary-100/50 rounded-lg" />
        <div className="h-10 bg-primary-100/50 rounded-lg" />
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchTripSummary({
      destination,
      days,
      interests,
      language,
    })
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [destination, days, interests, language]);

  if (loading) {
    return <TripSummarySkeleton />;
  }

  if (!summary) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-primary-200/90 bg-gradient-to-br from-white via-primary-100/30 to-white shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-primary-200/60 pb-3">
        <div className="flex items-center gap-2 text-primary-700 font-bold text-sm">
          <Compass className="w-5 h-5 text-primary-600" />
          <span className="font-display text-base text-secondary-900">
            Trip Overview & Vibe
          </span>
        </div>
        <span className="text-xs text-secondary-600 font-medium">
          Auto-Generated Summary
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
    </div>
  );
}
