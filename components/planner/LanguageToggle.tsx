"use client";

import { Languages } from "lucide-react";

export type LanguageType = "English" | "Hindi";

interface LanguageToggleProps {
  value: LanguageType;
  onChange: (val: LanguageType) => void;
}

export default function LanguageToggle({
  value,
  onChange,
}: LanguageToggleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary-900">
        Language Preference
      </label>
      <div className="flex items-center gap-3 p-1.5 rounded-lg border border-primary-200 bg-white">
        <div className="pl-2 flex items-center text-secondary-500">
          <Languages className="w-5 h-5" />
        </div>
        <div className="grid grid-cols-2 gap-1 flex-1">
          <button
            type="button"
            onClick={() => onChange("English")}
            className={`py-2 rounded-md text-xs font-semibold transition-all ${
              value === "English"
                ? "bg-primary-600 text-white shadow-sm"
                : "text-secondary-700 hover:bg-primary-100/50"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onChange("Hindi")}
            className={`py-2 rounded-md text-xs font-semibold transition-all ${
              value === "Hindi"
                ? "bg-primary-600 text-white shadow-sm"
                : "text-secondary-700 hover:bg-primary-100/50"
            }`}
          >
            Hindi (हिंदी)
          </button>
        </div>
      </div>
    </div>
  );
}
