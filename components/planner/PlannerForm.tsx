"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import PlannerHeader from "./PlannerHeader";
import DestinationInput from "./DestinationInput";
import DurationStepper from "./DurationStepper";
import InterestsSelect, { InterestType } from "./InterestsSelect";
import LanguageToggle, { LanguageType } from "./LanguageToggle";

export default function PlannerForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("Varanasi");
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<InterestType[]>([
    "Heritage",
    "Spiritual",
  ]);
  const [language, setLanguage] = useState<LanguageType>("English");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const query = new URLSearchParams({
        destination,
        days: days.toString(),
        interests: interests.join(","),
        language,
      });
      router.push(`/itinerary?${query.toString()}`);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border border-primary-200/80 bg-white/90 shadow-lg backdrop-blur-sm space-y-6">
      <PlannerHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <DestinationInput value={destination} onChange={setDestination} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DurationStepper value={days} onChange={setDays} />
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>

        <InterestsSelect selected={interests} onChange={setInterests} />

        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:opacity-80 text-white font-semibold text-base shadow-md transition-all duration-200 group cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Personalized Itinerary...</span>
              </>
            ) : (
              <>
                <span>Generate Itinerary</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
