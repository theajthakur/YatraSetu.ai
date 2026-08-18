"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Compass, MapPin, Calendar, Languages, ArrowLeft, Clock } from "lucide-react";
import { Suspense } from "react";

function ItineraryContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "Varanasi";
  const days = searchParams.get("days") || "3";
  const interests = searchParams.get("interests") || "Heritage, Spiritual";
  const language = searchParams.get("language") || "English";

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-primary-200 pb-6">
        <div>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Planner
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900">
            Itinerary for {destination}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-primary-200 bg-white">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Destination</div>
            <div className="text-sm font-bold text-secondary-900">{destination}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Duration</div>
            <div className="text-sm font-bold text-secondary-900">{days} Days</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Interests</div>
            <div className="text-sm font-bold text-secondary-900">{interests}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-primary-600" />
          <div>
            <div className="text-xs text-secondary-500 font-medium">Language</div>
            <div className="text-sm font-bold text-secondary-900">{language}</div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h2 className="font-display text-2xl font-bold text-secondary-900">
          Suggested Schedule Overview
        </h2>

        {Array.from({ length: Math.min(Number(days), 5) }).map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-primary-200 bg-white space-y-3"
          >
            <div className="flex items-center justify-between border-b border-primary-100 pb-3">
              <span className="font-display font-bold text-lg text-primary-700">
                Day {index + 1}: Cultural Exploration
              </span>
              <span className="flex items-center gap-1.5 text-xs text-secondary-600 font-medium">
                <Clock className="w-4 h-4" /> 09:00 AM - 07:00 PM
              </span>
            </div>
            <p className="text-sm text-secondary-700 leading-relaxed">
              Experience the core heritage landmarks, curated regional dining, and context-aware local transit routes in {destination}.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-secondary-700 font-medium">Loading itinerary...</div>}>
      <ItineraryContent />
    </Suspense>
  );
}
