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
      <div className="flex items-center gap-3 border-b border-primary-200 pb-4 overflow-x-auto">
        {days.map((d) => {
          const isActive = d.dayNumber === activeDay;
          return (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => handleDaySelect(d.dayNumber)}
              className={`px-6 py-3 rounded-xl text-base sm:text-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
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
        <div className="space-y-1 pt-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-secondary-900">
            Day {currentDayData.dayNumber}: {currentDayData.title}
          </h2>
        </div>
      )}

      {/* Stop Cards Grid or Day Switching Loader */}
      {isSwitchingDay ? (
        <div className="p-12 rounded-2xl border border-primary-200/60 bg-white flex flex-col items-center justify-center space-y-3 text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          <span className="text-sm sm:text-base font-semibold text-secondary-700">
            Fetching Day {activeDay} Route & Transit Crowd Updates...
          </span>
        </div>
      ) : (
        currentDayData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
