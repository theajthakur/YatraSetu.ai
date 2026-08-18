"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";
import { MapPin, Calendar, Languages, ArrowLeft, Compass } from "lucide-react";
import { getItinerary } from "@/lib/mockItineraries";
import DayTabs from "@/components/itinerary/DayTabs";
import HeritageModal from "@/components/itinerary/HeritageModal";

function ItineraryContent() {
  const searchParams = useSearchParams();
  const rawDestination = searchParams.get("destination") || "Varanasi";
  const daysParam = searchParams.get("days") || "2";
  const interestsParam = searchParams.get("interests") || "Heritage, Spiritual";
  const languageParam = searchParams.get("language") || "English";

  const itinerary = getItinerary(rawDestination);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          href="/planner"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Modify Trip Plan
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-primary-200 pb-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900">
            {itinerary.destination} Itinerary
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 font-medium">
            {itinerary.tagline}
          </p>
        </div>
      </div>

      {/* Trip Metadata Bar (No pills/badges, clean info items) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-primary-200 bg-white">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Destination</div>
            <div className="text-sm font-bold text-secondary-900">{itinerary.destination}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Duration</div>
            <div className="text-sm font-bold text-secondary-900">{daysParam} Days</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Interests</div>
            <div className="text-sm font-bold text-secondary-900">{interestsParam}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Language</div>
            <div className="text-sm font-bold text-secondary-900">{languageParam}</div>
          </div>
        </div>
      </div>

      {/* Day-Wise Stops */}
      <DayTabs
        days={itinerary.days}
        onViewHeritageInfo={(placeName) => setSelectedPlace(placeName)}
      />

      {/* Full Heritage Info Modal */}
      <HeritageModal
        placeName={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </main>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 text-secondary-700 font-medium">
          Loading itinerary...
        </div>
      }
    >
      <ItineraryContent />
    </Suspense>
  );
}
