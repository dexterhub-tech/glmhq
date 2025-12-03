import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./android-fixes.css";
import Footer from "@/components/Footer";
import NavBar from "./components/NavBar";
import PWARegister from "./components/PWARegister";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import TelegramButton from "./components/TelegramButton";
import VersionChecker from "./components/VersionChecker";
import { anton, inter, bigShouldersDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "GLM HQ",
  description: "Apostle Joseph Ibrahim Gospel Labour Ministry Homepage",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GLM HQ",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: "#181818",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={[anton.variable, inter.variable, bigShouldersDisplay.variable].join(' ')}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GLM HQ" />
        <meta name="format-detection" content="telephone=no" />
        {/* Android-specific meta tags */}
        <meta name="theme-color" content="#181818" />
        <meta name="color-scheme" content="light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="antialiased">
        <PWARegister />
        <VersionChecker />
        <NavBar />
        {children}
        <Footer />
        <TelegramButton />
        {/* Custom install prompt for Android and supporting browsers */}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
