"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Type definition for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Handles the `beforeinstallprompt` event so we can explicitly show
// an install button on Android when the PWA criteria are met.
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Cast to BeforeInstallPromptEvent since the browser event isn't in standard DOM types
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if device is desktop (screen width >= 1024px OR desktop user agent)
      const isDesktopWidth = window.innerWidth >= 1024;
      const isDesktopUA = /Windows|Macintosh|Linux/i.test(navigator.userAgent) && !/Mobile|Android/i.test(navigator.userAgent);

      // Only show prompt if NOT desktop
      if (!isDesktopWidth && !isDesktopUA) {
        setVisible(true);
      }
    };

    // Only run in browsers that support the event
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Hide prompt if app is already installed (standalone or TWA)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setVisible(false);
      setDeferredPrompt(null);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      // User accepted the install
      setVisible(false);
    } else {
      // User dismissed the install
      // We still hide the prompt to avoid nagging
      setVisible(false);
    }

    setDeferredPrompt(null);
  };

  if (!visible || typeof window === "undefined") return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-[#181818] text-white px-4 py-2 shadow-lg max-w-xl w-full sm:w-auto">
        <span className="text-xs sm:text-sm font-medium">
          Install GLM HQ on your device for a faster app experience.
        </span>
        <Button
          size="sm"
          className="whitespace-nowrap rounded-full bg-white text-black hover:bg-gray-100 text-xs sm:text-sm"
          onClick={handleInstallClick}
        >
          INSTALL APP
        </Button>
      </div>
    </div>
  );
}
