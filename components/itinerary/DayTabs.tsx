"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DayItinerary } from "@/lib/mockItineraries";
import StopCard from "./StopCard";

interface DayTabsProps {
  days: DayItinerary[];
  onViewHeritageInfo?: (placeName: string) => void;
}

export default function DayTabs({ days, onViewHeritageInfo }: DayTabsProps) {
  const [activeDay, setActiveDay] = useState(1);
  const [isSwitchingDay, setIsSwitchingDay] = useState(false);

  const handleDaySelect = (dayNum: number) => {
    if (dayNum === activeDay) return;
    setIsSwitchingDay(true);
    setActiveDay(dayNum);
    setTimeout(() => {
      setIsSwitchingDay(false);
    }, 500);
  };

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
              onClick={() => handleDaySelect(d.dayNumber)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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

      {/* Stop Cards Grid or Day Switching Loader */}
      {isSwitchingDay ? (
        <div className="p-12 rounded-xl border border-primary-200/60 bg-white flex flex-col items-center justify-center space-y-2 text-center">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
          <span className="text-xs font-semibold text-secondary-700">
            Fetching Day {activeDay} Route & Transit Crowd Updates...
          </span>
        </div>
      ) : (
        currentDayData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDayData.stops.map((stop) => (
              <StopCard
                key={stop.id}
                stop={stop}
                onViewHeritageInfo={onViewHeritageInfo}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
