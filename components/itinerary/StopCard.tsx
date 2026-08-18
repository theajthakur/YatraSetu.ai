"use client";

import { useState } from "react";
import { Clock, Info, Compass, ChevronDown, ChevronUp, Heart, Users } from "lucide-react";
import Card from "@/components/common/Card";
import { ItineraryStop } from "@/lib/mockItineraries";
import { fetchPlaceInsights, PlaceInsight } from "@/app/api/gemini/gemini";

interface StopCardProps {
  stop: ItineraryStop;
  onViewHeritageInfo?: (placeName: string) => void;
}

function InsightSkeleton() {
  return (
    <div className="animate-pulse space-y-2 p-3.5 rounded-lg bg-primary-100/40 border border-primary-200/60">
      <div className="h-3 bg-primary-200/70 rounded w-4/5" />
      <div className="h-3 bg-primary-200/70 rounded w-full" />
      <div className="h-3 bg-primary-200/70 rounded w-2/3" />
    </div>
  );
}

export default function StopCard({ stop, onViewHeritageInfo }: StopCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insight, setInsight] = useState<PlaceInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCrowdDotColor = (status: ItineraryStop["crowdStatus"]) => {
    switch (status) {
      case "low":
        return "bg-emerald-600";
      case "moderate":
        return "bg-amber-600";
      case "high":
        return "bg-rose-600";
      default:
        return "bg-secondary-400";
    }
  };

  const handleToggleInsight = async () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !insight && !loading) {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchPlaceInsights({ placeName: stop.name });
        setInsight(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="flex flex-col justify-between space-y-4 w-full">
      <div className="space-y-3">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-secondary-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary-600" />
            <span>{stop.timeSlot}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${getCrowdDotColor(
                stop.crowdStatus
              )}`}
            />
            <span className="text-secondary-700 font-medium">
              {stop.crowdLevel}
            </span>
          </div>
        </div>

        {/* Stop Heading & Description */}
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-secondary-900 leading-snug">
            {stop.name}
          </h3>
          <p className="text-xs sm:text-sm text-secondary-700 leading-relaxed">
            {stop.description}
          </p>
        </div>

        {/* AI Insight Expandable Toggle Button */}
        <div>
          <button
            type="button"
            onClick={handleToggleInsight}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors py-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-primary-600" />
            <span>{isExpanded ? "Hide AI Insight" : "View AI Insight"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Expandable Panel */}
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {loading ? (
                <InsightSkeleton />
              ) : error ? (
                <div className="p-3 rounded-lg bg-primary-100/30 border border-primary-200/60 text-xs text-secondary-600">
                  Insight unavailable
                </div>
              ) : insight ? (
                <div className="p-3.5 rounded-lg bg-primary-100/40 border border-primary-200/80 space-y-2 text-xs">
                  {/* Summary */}
                  <p className="text-secondary-800 leading-relaxed">
                    {insight.summary}
                  </p>

                  {/* Hospitality & Safety */}
                  <div className="flex items-start gap-1.5 text-secondary-700 border-t border-primary-200/60 pt-2">
                    <Heart className="w-3.5 h-3.5 text-primary-600 mt-0.5 shrink-0" />
                    <span className="leading-snug">{insight.hospitality}</span>
                  </div>

                  {/* Crowd Suggestion */}
                  <div className="flex items-center gap-1.5 text-secondary-900 font-semibold border-t border-primary-200/60 pt-2">
                    <Users className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                    <span className="text-[11px]">
                      {insight.crowd_suggestion}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-primary-100 flex items-center justify-between">
        <span className="text-xs font-medium text-primary-700">
          {stop.category}
        </span>

        <button
          type="button"
          onClick={() => onViewHeritageInfo?.(stop.name)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>View heritage info</span>
        </button>
      </div>
    </Card>
  );
}
