"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { PlaceSuggestion } from "@/app/api/places/route";

interface DestinationInputProps {
  value: string;
  onChange: (val: string) => void;
}

const PRESET_CITIES = ["Varanasi", "Jaipur", "Kochi", "Amritsar"];

export default function DestinationInput({
  value,
  onChange,
}: DestinationInputProps) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search effect (350ms)
  useEffect(() => {
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/places?input=${encodeURIComponent(value.trim())}`
        );
        if (response.ok) {
          const json = await response.json();
          if (json.predictions && json.predictions.length > 0) {
            setSuggestions(json.predictions);
            setIsOpen(true);
          } else {
            setSuggestions([]);
            setIsOpen(false);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch places autocomplete suggestions:", err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    onChange(suggestion.main_text || suggestion.description);
    setIsOpen(false);
  };

  const handleSelectPreset = (city: string) => {
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="block text-sm font-semibold text-secondary-900">
        Destination
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary-500">
          <MapPin className="w-5 h-5 text-primary-600" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder="Where do you want to go? (e.g. Varanasi, Jaipur)"
          className="w-full pl-11 pr-10 py-3 rounded-lg border border-primary-300 bg-white text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm transition-all"
          required
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-primary-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <button
              key={item.place_id}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className="w-full text-left px-4 py-3 hover:bg-primary-100/60 transition-colors flex items-start gap-3 border-b border-primary-100 last:border-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-secondary-900">
                  {item.main_text}
                </span>
                {item.secondary_text && (
                  <span className="text-[11px] text-secondary-600">
                    {item.secondary_text}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Preset Suggestions Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-secondary-600">
          Suggestions:
        </span>
        {PRESET_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleSelectPreset(city)}
            className={`text-xs px-3 py-1.5 rounded-md border text-secondary-800 transition-colors cursor-pointer ${
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
