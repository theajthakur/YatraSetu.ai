"use client";

import { Clock, Info } from "lucide-react";
import Card from "@/components/common/Card";
import { ItineraryStop } from "@/lib/mockItineraries";

interface StopCardProps {
  stop: ItineraryStop;
  onViewHeritageInfo?: (placeName: string) => void;
}

export default function StopCard({ stop, onViewHeritageInfo }: StopCardProps) {
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

  return (
    <Card className="flex flex-col justify-between space-y-4">
      <div className="space-y-2">
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

        <h3 className="font-display text-lg font-bold text-secondary-900 leading-snug">
          {stop.name}
        </h3>

        <p className="text-xs sm:text-sm text-secondary-700 line-clamp-2 leading-relaxed">
          {stop.description}
        </p>
      </div>

      <div className="pt-2 border-t border-primary-100 flex items-center justify-between">
        <span className="text-xs font-medium text-primary-700">
          {stop.category}
        </span>

        <button
          type="button"
          onClick={() => onViewHeritageInfo?.(stop.name)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>View heritage info</span>
        </button>
      </div>
    </Card>
  );
}
