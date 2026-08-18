"use client";

import { X, Landmark } from "lucide-react";

interface HeritageModalStubProps {
  placeName: string | null;
  onClose: () => void;
}

export default function HeritageModalStub({
  placeName,
  onClose,
}: HeritageModalStubProps) {
  if (!placeName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-primary-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-primary-100 pb-3">
          <div className="flex items-center gap-2 text-primary-600">
            <Landmark className="w-5 h-5" />
            <span className="font-display font-bold text-base text-secondary-900">
              Heritage Information
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-500 hover:text-secondary-900 hover:bg-primary-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold text-secondary-900">
            {placeName}
          </h3>
          <p className="text-xs sm:text-sm text-secondary-700 leading-relaxed">
            Detailed heritage story, architectural history, cultural significance, and QR scanner integration for {placeName} will be accessible here.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
