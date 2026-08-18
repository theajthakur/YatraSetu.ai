"use client";

import { MapPin } from "lucide-react";

interface DestinationInputProps {
  value: string;
  onChange: (val: string) => void;
}

const PRESET_CITIES = ["Varanasi", "Jaipur", "Kochi", "Amritsar"];

export default function DestinationInput({
  value,
  onChange,
}: DestinationInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary-900">
        Destination
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary-500">
          <MapPin className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Where do you want to go? (e.g. Varanasi, Jaipur)"
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-primary-300 bg-white text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm transition-all"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-secondary-600">Suggestions:</span>
        {PRESET_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onChange(city)}
            className={`text-xs px-3 py-1.5 rounded-md border text-secondary-800 transition-colors ${
              value.toLowerCase() === city.toLowerCase()
                ? "bg-primary-600 text-white border-primary-600 font-semibold"
                : "bg-primary-100/60 border-primary-200 hover:bg-primary-200/60"
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
