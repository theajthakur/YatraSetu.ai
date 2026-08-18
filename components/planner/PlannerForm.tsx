"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PlannerHeader from "./PlannerHeader";
import DestinationInput from "./DestinationInput";
import DurationStepper from "./DurationStepper";
import InterestsSelect, { InterestType } from "./InterestsSelect";
import LanguageToggle, { LanguageType } from "./LanguageToggle";

export default function PlannerForm() {
  const router = Router();
  const [destination, setDestination] = useState("Varanasi");
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<InterestType[]>([
    "Heritage",
    "Spiritual",
  ]);
  const [language, setLanguage] = useState<LanguageType>("English");

  function Router() {
    return useRouter();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination,
      days: days.toString(),
      interests: interests.join(","),
      language,
    });
    router.push(`/itinerary?${query.toString()}`);
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
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold text-base shadow-md transition-all duration-200 group"
          >
            <span>Generate Itinerary</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </form>
    </div>
  );
}
