"use client";

import { useEffect, useState } from "react";

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

interface ManifestData {
  name?: string;
  short_name?: string;
  start_url?: string;
  display?: string;
  icons?: ManifestIcon[];
  [key: string]: unknown;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAStatus {
  https: boolean;
  manifest: boolean;
  serviceWorker: boolean;
  icons: boolean;
  installable: boolean;
  installed: boolean;
  manifestData: ManifestData | null;
  errors: string[];
}

export default function PWATestPage() {
  const [status, setStatus] = useState<PWAStatus>({
    https: false,
    manifest: false,
    serviceWorker: false,
    icons: false,
    installable: false,
    installed: false,
    manifestData: null,
    errors: [],
  });
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    checkPWAStatus();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setStatus((prev) => ({ ...prev, installable: true }));
      console.log("beforeinstallprompt event fired - PWA is installable!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setStatus((prev) => ({ ...prev, installed: true }));
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const checkPWAStatus = async () => {
    const errors: string[] = [];
    const newStatus: Partial<PWAStatus> = {};

    // Check HTTPS
    newStatus.https = window.location.protocol === "https:" || window.location.hostname === "localhost";
    if (!newStatus.https) {
      errors.push("Site must be served over HTTPS");
    }

    // Check manifest
    try {
      const manifestResponse = await fetch("/manifest.json");
      if (manifestResponse.ok) {
        const manifestData = await manifestResponse.json();
        newStatus.manifest = true;
        newStatus.manifestData = manifestData;

        // Validate manifest
        if (!manifestData.name) errors.push("Manifest missing 'name'");
        if (!manifestData.short_name) errors.push("Manifest missing 'short_name'");
        if (!manifestData.start_url) errors.push("Manifest missing 'start_url'");
        if (!manifestData.display) errors.push("Manifest missing 'display'");
        if (!manifestData.icons || manifestData.icons.length === 0) {
          errors.push("Manifest missing icons");
        } else {
          const has192 = manifestData.icons.some((icon: ManifestIcon) => icon.sizes.includes("192"));
          const has512 = manifestData.icons.some((icon: ManifestIcon) => icon.sizes.includes("512"));
          newStatus.icons = has192 && has512;
          if (!has192) errors.push("Manifest missing 192x192 icon");
          if (!has512) errors.push("Manifest missing 512x512 icon");
        }
      } else {
        errors.push("Manifest.json not found or not accessible");
      }
    } catch (error) {
      errors.push(`Manifest fetch error: ${error}`);
    }

    // Check service worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        newStatus.serviceWorker = !!registration;
        if (!registration) {
          errors.push("Service worker not registered");
        }
      } catch (error) {
        errors.push(`Service worker check error: ${error}`);
      }
    } else {
      errors.push("Service workers not supported in this browser");
    }

    setStatus((prev) => ({ ...prev, ...newStatus, errors }));
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Install prompt not available. Make sure all PWA requirements are met.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PWA Installation Test</h1>

        {/* Status Cards */}
        <div className="space-y-4 mb-8">
          <StatusCard title="HTTPS" status={status.https} description="Site must be served over HTTPS" />
          <StatusCard title="Manifest" status={status.manifest} description="Valid manifest.json file" />
          <StatusCard title="Service Worker" status={status.serviceWorker} description="Service worker registered" />
          <StatusCard title="Icons" status={status.icons} description="192x192 and 512x512 icons present" />
          <StatusCard
            title="Installable"
            status={status.installable}
            description="beforeinstallprompt event fired"
          />
          <StatusCard title="Already Installed" status={status.installed} description="Running as installed PWA" />
        </div>

        {/* Errors */}
        {status.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Issues Found:</h2>
            <ul className="list-disc list-inside space-y-1">
              {status.errors.map((error, index) => (
                <li key={index} className="text-red-700">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Install Button */}
        {deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
          >
            Install PWA Now
          </button>
        )}

        {/* Manifest Data */}
        {status.manifestData && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Manifest Data:</h2>
            <pre className="text-sm text-gray-700 overflow-x-auto">{JSON.stringify(status.manifestData, null, 2)}</pre>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Troubleshooting:</h2>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>All status items above should show green checkmarks</li>
            <li>If &quot;Installable&quot; is red, the install prompt won&apos;t appear</li>
            <li>Chrome requires you to visit the site at least once before showing the prompt</li>
            <li>If already installed, uninstall first to test again</li>
            <li>Check browser console (F12) for detailed errors</li>
            <li>Try clearing browser cache and reloading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, status, description }: { title: string; status: boolean; description: string }) {
  return (
    <div className={`border rounded-lg p-4 ${status ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-semibold ${status ? "text-green-900" : "text-red-900"}`}>{title}</h3>
          <p className={`text-sm ${status ? "text-green-700" : "text-red-700"}`}>{description}</p>
        </div>
        <div className="text-2xl">{status ? "✅" : "❌"}</div>
      </div>
    </div>
  );
}

