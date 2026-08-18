"use client";

import { useState } from "react";
import {
  Landmark,
  Languages,
  Play,
  Pause,
  Headphones,
  Info,
  Loader2,
  Users,
  Heart,
  Compass,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getHeritageData } from "@/lib/mockHeritageData";
import { fetchPlaceInsights, PlaceInsight } from "@/lib/ai";

interface HeritageModalProps {
  placeName: string | null;
  onClose: () => void;
}

export default function HeritageModal({
  placeName,
  onClose,
}: HeritageModalProps) {
  const [language, setLanguage] = useState<"English" | "Hindi">("English");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioBuffering, setIsAudioBuffering] = useState(false);
  const [aiInsight, setAiInsight] = useState<PlaceInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  if (!placeName) return null;

  const data = getHeritageData(placeName);
  const localizedContent = data[language];

  const handleLanguageSwitch = (lang: "English" | "Hindi") => {
    setLanguage(lang);
  };

  const handleAudioToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsAudioBuffering(true);
      setTimeout(() => {
        setIsAudioBuffering(false);
        setIsPlaying(true);
      }, 500);
    }
  };

  const handleLoadAiInsights = async () => {
    setIsLoadingInsight(true);
    try {
      const insight = await fetchPlaceInsights({ placeName, language });
      setAiInsight(insight);
    } catch (err) {
      console.warn("Failed to load AI insights:", err);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  return (
    <Dialog open={!!placeName} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl sm:max-w-2xl p-6 sm:p-8 bg-white border border-primary-200 rounded-2xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between border-b border-primary-100 pb-3">
            <div className="flex items-center gap-2 text-primary-700">
              <Landmark className="w-5 h-5 text-primary-600" />
              <span className="font-display font-bold text-sm text-secondary-700">
                Heritage Guide & Archives
              </span>
            </div>

            {/* Language Toggle Segment (No Pills) */}
            <div className="flex items-center gap-1.5 p-1 rounded-md border border-primary-200 bg-primary-100/40">
              <Languages className="w-4 h-4 text-secondary-500 ml-1" />
              <button
                type="button"
                onClick={() => handleLanguageSwitch("English")}
                className={`px-3 py-1 rounded text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  language === "English"
                    ? "bg-primary-600 text-white"
                    : "text-secondary-700 hover:text-secondary-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch("Hindi")}
                className={`px-3 py-1 rounded text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  language === "Hindi"
                    ? "bg-primary-600 text-white"
                    : "text-secondary-700 hover:text-secondary-900"
                }`}
              >
                HI
              </button>
            </div>
          </div>

          <DialogTitle className="font-display text-2xl sm:text-3xl font-extrabold text-secondary-900 leading-tight pt-1">
            {localizedContent.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary-600 font-medium">
            Architectural and historical archives
          </DialogDescription>
        </DialogHeader>

        {/* Audio Guide Controls */}
        <div className="p-5 rounded-2xl border border-primary-200 bg-primary-100/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary-600 text-white">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-secondary-900">
                  Audio Guide
                </div>
                <div className="text-xs sm:text-sm text-secondary-600 font-medium">
                  Duration: {data.audioDuration}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAudioToggle}
              disabled={isAudioBuffering}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-900 hover:bg-secondary-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer disabled:opacity-80"
            >
              {isAudioBuffering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Buffering...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Audio</span>
                </>
              )}
            </button>
          </div>

          {/* Audio Progress Bar */}
          {isPlaying && !isAudioBuffering && (
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-primary-200 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-600 h-full w-2/5 animate-pulse" />
              </div>
              <div className="flex justify-between text-xs text-secondary-600 font-semibold">
                <span>01:15</span>
                <span>{data.audioDuration}</span>
              </div>
            </div>
          )}
        </div>

        {/* Heritage Story Content */}
        <div className="space-y-4">
          <p className="text-base sm:text-lg text-secondary-800 leading-relaxed font-normal">
            {localizedContent.summary}
          </p>

          <div className="p-4 rounded-xl border border-primary-200/80 bg-primary-100/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <div className="text-sm sm:text-base text-secondary-800 leading-relaxed">
              <span className="font-bold text-secondary-900">
                Key Heritage Fact:{" "}
              </span>
              {localizedContent.keyFact}
            </div>
          </div>
        </div>

        {/* AI Insights Button & Panel (Click-Triggered Only) */}
        {!aiInsight ? (
          <button
            type="button"
            onClick={handleLoadAiInsights}
            disabled={isLoadingInsight}
            className="w-full py-3.5 rounded-xl border border-primary-300 bg-primary-100/50 hover:bg-primary-100 text-primary-800 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
          >
            {isLoadingInsight ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                <span>Loading AI Insights...</span>
              </>
            ) : (
              <>
                <Compass className="w-5 h-5 text-primary-600" />
                <span>Load Live AI Insights for {placeName}</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-4 p-5 rounded-2xl border border-primary-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 text-primary-700 font-bold text-sm sm:text-base border-b border-primary-100 pb-2.5">
              <Compass className="w-5 h-5 text-primary-600" />
              <span>Contextual AI Insights</span>
            </div>

            <div className="space-y-2 text-sm sm:text-base text-secondary-800 leading-relaxed font-normal">
              <p>{aiInsight.summary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-primary-100/40 border border-primary-200/60 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-secondary-900 text-sm">
                  <Heart className="w-4 h-4 text-primary-600" />
                  <span>Hospitality & Vibe</span>
                </div>
                <div className="text-secondary-700 text-xs sm:text-sm leading-relaxed">
                  {aiInsight.hospitality}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-primary-100/40 border border-primary-200/60 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-secondary-900 text-sm">
                  <Users className="w-4 h-4 text-primary-600" />
                  <span>Crowd & Timing</span>
                </div>
                <div className="text-secondary-700 text-xs sm:text-sm leading-relaxed">
                  {aiInsight.crowd_suggestion}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action / Close */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-primary-300 bg-white hover:bg-primary-100/50 text-secondary-900 text-sm sm:text-base font-bold transition-colors cursor-pointer"
          >
            Close Heritage Info
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
