"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";
import { MapPin, Calendar, Languages, ArrowLeft, Compass } from "lucide-react";
import { getItinerary, DestinationItinerary } from "@/lib/mockItineraries";
import DayTabs from "@/components/itinerary/DayTabs";
import HeritageModal from "@/components/itinerary/HeritageModal";
import TripSummaryCard from "@/components/itinerary/TripSummaryCard";

function ItineraryContent() {
  const searchParams = useSearchParams();
  const rawDestination = searchParams.get("destination") || "Varanasi";
  const daysParam = searchParams.get("days") || "2";
  const interestsParam = searchParams.get("interests") || "Heritage, Spiritual";
  const languageParam = searchParams.get("language") || "English";

  // Synchronously lookup preset dataset or create local itinerary
  const itinerary: DestinationItinerary =
    getItinerary(rawDestination) ||
    createLocalItinerary(rawDestination, Number(daysParam));

  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  function createLocalItinerary(
    dest: string,
    numDays: number = 2
  ): DestinationItinerary {
    return {
      destination: dest,
      tagline: `Cultural Exploration & Heritage Discoveries in ${dest}`,
      days: Array.from({ length: Math.max(1, Math.min(numDays, 5)) }).map(
        (_, i) => ({
          dayNumber: i + 1,
          title: `Day ${i + 1}: ${dest} Heritage Walk & Local Highlights`,
          stops: [
            {
              id: `${dest.toLowerCase()}-${i + 1}-1`,
              name: `${dest} Central Heritage Square`,
              timeSlot: "09:00 AM - 11:30 AM",
              description: `Explore historic architectural monuments and central heritage walkways of ${dest}.`,
              crowdLevel: "Moderate crowd",
              crowdStatus: "moderate",
              category: "Heritage",
            },
            {
              id: `${dest.toLowerCase()}-${i + 1}-2`,
              name: `${dest} Local Culinary & Artisan Quarter`,
              timeSlot: "01:30 PM - 04:00 PM",
              description: `Sample regional food specialties and discover local handicrafts in ${dest}.`,
              crowdLevel: "Low crowd",
              crowdStatus: "low",
              category: "Food",
            },
          ],
        })
      ),
    };
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          href="/planner"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Modify Trip Plan
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-primary-200 pb-4">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-secondary-900">
              {itinerary.destination} Itinerary
            </h1>
            <p className="text-sm sm:text-lg text-secondary-600 font-medium pt-1">
              {itinerary.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Metadata Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-primary-200 bg-white shadow-xs">
        <div className="flex items-center gap-3.5">
          <MapPin className="w-6 h-6 text-primary-600 shrink-0" />
          <div>
            <div className="text-xs sm:text-sm text-secondary-500 font-semibold">Destination</div>
            <div className="text-base sm:text-xl font-bold text-secondary-900">{itinerary.destination}</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Calendar className="w-6 h-6 text-primary-600 shrink-0" />
          <div>
            <div className="text-xs sm:text-sm text-secondary-500 font-semibold">Duration</div>
            <div className="text-base sm:text-xl font-bold text-secondary-900">{daysParam} Days</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Compass className="w-6 h-6 text-primary-600 shrink-0" />
          <div>
            <div className="text-xs sm:text-sm text-secondary-500 font-semibold">Interests</div>
            <div className="text-base sm:text-xl font-bold text-secondary-900">{interestsParam}</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Languages className="w-6 h-6 text-primary-600 shrink-0" />
          <div>
            <div className="text-xs sm:text-sm text-secondary-500 font-semibold">Language</div>
            <div className="text-base sm:text-xl font-bold text-secondary-900">{languageParam}</div>
          </div>
        </div>
      </div>

      {/* Trip-Level Auto Summary Card (Button-Triggered Only) */}
      <TripSummaryCard
        destination={itinerary.destination}
        days={daysParam}
        interests={interestsParam}
        language={languageParam}
      />

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
