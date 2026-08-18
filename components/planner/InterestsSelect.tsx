"use client";

import { Landmark, Utensils, Mountain, Sun, Check } from "lucide-react";

export type InterestType = "Heritage" | "Food" | "Adventure" | "Spiritual";

interface InterestsSelectProps {
  selected: InterestType[];
  onChange: (selected: InterestType[]) => void;
}

const INTEREST_OPTIONS: { id: InterestType; label: string; icon: React.ElementType }[] = [
  { id: "Heritage", label: "Heritage", icon: Landmark },
  { id: "Food", label: "Food", icon: Utensils },
  { id: "Adventure", label: "Adventure", icon: Mountain },
  { id: "Spiritual", label: "Spiritual", icon: Sun },
];

export default function InterestsSelect({
  selected,
  onChange,
}: InterestsSelectProps) {
  const toggleInterest = (id: InterestType) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary-900">
        Interests
      </label>
      <div className="grid grid-cols-2 gap-3">
        {INTEREST_OPTIONS.map(({ id, label, icon: Icon }) => {
          const isChecked = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleInterest(id)}
              className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                isChecked
                  ? "bg-primary-100 border-primary-600 text-secondary-900 shadow-sm"
                  : "bg-white border-primary-200 text-secondary-700 hover:border-primary-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isChecked ? "text-primary-600" : "text-secondary-500"
                  }`}
                />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isChecked
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "border-primary-300 bg-white"
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
