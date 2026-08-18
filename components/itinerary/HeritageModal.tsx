"use client";

import { useState, useEffect } from "react";
import {
  Landmark,
  Languages,
  Play,
  Pause,
  Headphones,
  Info,
  Loader2,
  QrCode,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getHeritageData } from "@/lib/mockHeritageData";

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
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isAudioBuffering, setIsAudioBuffering] = useState(false);

  useEffect(() => {
    if (placeName) {
      setIsLoadingContent(true);
      setIsPlaying(false);
      const timer = setTimeout(() => {
        setIsLoadingContent(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [placeName]);

  if (!placeName) return null;

  const data = getHeritageData(placeName);
  const localizedContent = data[language];

  const handleLanguageSwitch = (lang: "English" | "Hindi") => {
    if (lang === language) return;
    setIsLoadingContent(true);
    setLanguage(lang);
    setTimeout(() => {
      setIsLoadingContent(false);
    }, 400);
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

  return (
    <Dialog open={!!placeName} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-6 bg-white border border-primary-200 rounded-2xl shadow-2xl space-y-5">
        {isLoadingContent ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <QrCode className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="font-display text-lg font-bold text-secondary-900">
                Scanning QR Code & Loading Heritage Archives...
              </DialogTitle>
              <DialogDescription className="text-xs text-secondary-600 flex items-center justify-center gap-1.5 pt-1">
                <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                <span>Retrieving verified architectural history...</span>
              </DialogDescription>
            </div>
          </div>
        ) : (
          <>
            {/* Top Header */}
            <DialogHeader className="space-y-3">
              <div className="flex items-center justify-between border-b border-primary-100 pb-3">
                <div className="flex items-center gap-2 text-primary-700">
                  <Landmark className="w-5 h-5 text-primary-600" />
                  <span className="font-display font-semibold text-xs text-secondary-600">
                    Heritage Guide & QR Scanner
                  </span>
                </div>

                {/* Language Toggle Segment (No Pills) */}
                <div className="flex items-center gap-1 p-1 rounded-md border border-primary-200 bg-primary-100/40">
                  <Languages className="w-3.5 h-3.5 text-secondary-500 ml-1" />
                  <button
                    type="button"
                    onClick={() => handleLanguageSwitch("English")}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
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
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      language === "Hindi"
                        ? "bg-primary-600 text-white"
                        : "text-secondary-700 hover:text-secondary-900"
                    }`}
                  >
                    HI
                  </button>
                </div>
              </div>

              <DialogTitle className="font-display text-2xl font-bold text-secondary-900 leading-tight">
                {localizedContent.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-secondary-500 font-medium">
                Audio-visual cultural archives
              </DialogDescription>
            </DialogHeader>

            {/* Audio Guide Controls (UI simulation) */}
            <div className="p-4 rounded-xl border border-primary-200 bg-primary-100/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary-600 text-white">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-secondary-900">
                      Audio Guide
                    </div>
                    <div className="text-xs text-secondary-600">
                      Duration: {data.audioDuration}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAudioToggle}
                  disabled={isAudioBuffering}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-secondary-900 hover:bg-secondary-800 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-80"
                >
                  {isAudioBuffering ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Buffering...</span>
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Audio</span>
                    </>
                  )}
                </button>
              </div>

              {/* Simulated Audio Progress Bar */}
              {isPlaying && !isAudioBuffering && (
                <div className="space-y-1 pt-1">
                  <div className="w-full bg-primary-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-600 h-full w-2/5 animate-pulse" />
                  </div>
                  <div className="flex justify-between text-[10px] text-secondary-600 font-medium">
                    <span>01:15</span>
                    <span>{data.audioDuration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Heritage Story Content */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-secondary-800 leading-relaxed">
                {localizedContent.summary}
              </p>

              <div className="p-3 rounded-lg border border-primary-200/80 bg-white flex items-start gap-2.5">
                <Info className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                <div className="text-xs text-secondary-700 leading-snug">
                  <span className="font-semibold text-secondary-900">
                    Key Fact:{" "}
                  </span>
                  {localizedContent.keyFact}
                </div>
              </div>
            </div>

            {/* Action / Close */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-lg border border-primary-300 bg-white hover:bg-primary-100/50 text-secondary-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Heritage Info
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
