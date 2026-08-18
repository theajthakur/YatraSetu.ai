"use client";

import { Calendar, Minus, Plus } from "lucide-react";

interface DurationStepperProps {
  value: number;
  onChange: (val: number) => void;
}

export default function DurationStepper({
  value,
  onChange,
}: DurationStepperProps) {
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < 30) onChange(value + 1);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary-900">
        Duration (Days)
      </label>
      <div className="flex items-center justify-between p-2.5 rounded-lg border border-primary-300 bg-white">
        <div className="flex items-center gap-3 text-secondary-700 pl-1">
          <Calendar className="w-5 h-5 text-secondary-500" />
          <span className="text-sm font-medium text-secondary-900">
            {value} {value === 1 ? "Day" : "Days"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= 1}
            className="p-2 rounded-md border border-primary-200 bg-primary-100/50 text-secondary-800 hover:bg-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease days"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-secondary-900">
            {value}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= 30}
            className="p-2 rounded-md border border-primary-200 bg-primary-100/50 text-secondary-800 hover:bg-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase days"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
