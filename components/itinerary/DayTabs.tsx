"use client";

import { useState } from "react";
import { DayItinerary } from "@/lib/mockItineraries";
import StopCard from "./StopCard";

interface DayTabsProps {
  days: DayItinerary[];
  onViewHeritageInfo?: (placeName: string) => void;
}

export default function DayTabs({ days, onViewHeritageInfo }: DayTabsProps) {
  const [activeDay, setActiveDay] = useState(1);

  const currentDayData = days.find((d) => d.dayNumber === activeDay) || days[0];

  return (
    <div className="space-y-6">
      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-primary-200 pb-3 overflow-x-auto">
        {days.map((d) => {
          const isActive = d.dayNumber === activeDay;
          return (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => setActiveDay(d.dayNumber)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white text-secondary-700 border border-primary-200 hover:bg-primary-100/60"
              }`}
            >
              Day {d.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Day Header Title */}
      {currentDayData && (
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-secondary-900">
            Day {currentDayData.dayNumber}: {currentDayData.title}
          </h2>
        </div>
      )}

      {/* Stop Cards Grid */}
      {currentDayData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDayData.stops.map((stop) => (
            <StopCard
              key={stop.id}
              stop={stop}
              onViewHeritageInfo={onViewHeritageInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
