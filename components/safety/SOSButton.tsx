"use client";

import { useState } from "react";
import { ShieldAlert, CheckCircle2, MapPin, UserCheck, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenAlert = () => {
    setOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenAlert}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary-800 text-white shadow-xl hover:bg-primary-900 active:scale-95 transition-all duration-200 border border-primary-700/80 cursor-pointer"
        aria-label="Trigger Safety SOS Alert"
      >
        <ShieldAlert className="w-5 h-5 text-primary-200 stroke-[2.2]" />
        <span className="font-display font-semibold text-sm tracking-wide">
          Safety SOS
        </span>
      </button>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setIsLoading(false);
        }}
      >
        <DialogContent className="max-w-md p-6 bg-white border border-primary-200 rounded-2xl shadow-2xl space-y-4">
          {isLoading ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
              <div className="space-y-1">
                <DialogTitle className="font-display text-lg font-bold text-secondary-900">
                  Connecting to Emergency Network...
                </DialogTitle>
                <DialogDescription className="text-xs text-secondary-600">
                  Encrypting GPS location & alerting emergency contacts...
                </DialogDescription>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader className="space-y-2">
                <div className="flex items-center gap-2 text-primary-700">
                  <CheckCircle2 className="w-5 h-5 text-primary-600" />
                  <DialogTitle className="font-display text-xl font-bold text-secondary-900">
                    Alert Sent
                  </DialogTitle>
                </div>
                <DialogDescription className="text-xs sm:text-sm text-secondary-700 font-normal leading-relaxed">
                  Your safety location has been shared calmly with your emergency contact and local travel desk.
                </DialogDescription>
              </DialogHeader>

              <div className="p-4 rounded-xl border border-primary-200 bg-primary-100/40 space-y-3">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-primary-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-secondary-900">
                      Emergency Contact
                    </div>
                    <div className="text-xs text-secondary-700">
                      Rajesh Sharma (Brother) — +91 98765 43210
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-primary-200/60 pt-3">
                  <MapPin className="w-4 h-4 text-primary-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-secondary-900">
                      Shared Location
                    </div>
                    <div className="text-xs text-secondary-700">
                      Dashashwamedh Ghat Corridor, Varanasi (GPS Active)
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-lg bg-secondary-900 hover:bg-secondary-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Acknowledge & Close
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
