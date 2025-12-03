'use client';

import { useEffect, useState } from 'react';

// Generate a build ID at build time (you can also use an env variable)
const CURRENT_VERSION = process.env.NEXT_PUBLIC_BUILD_ID || Date.now().toString();
const DISMISSED_VERSION_KEY = 'glm_dismissed_version';
const INSTALLED_VERSION_KEY = 'glm_installed_version';

export default function VersionChecker() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [newVersion, setNewVersion] = useState<string | null>(null);

  useEffect(() => {
    // Store the current version as installed when component mounts
    const installedVersion = localStorage.getItem(INSTALLED_VERSION_KEY);
    if (installedVersion !== CURRENT_VERSION) {
      localStorage.setItem(INSTALLED_VERSION_KEY, CURRENT_VERSION);
      // Clear dismissed version when user has updated
      localStorage.removeItem(DISMISSED_VERSION_KEY);
    }

    // Check for new version every 5 minutes
    const checkInterval = 5 * 60 * 1000; // 5 minutes
    
    const checkForUpdate = async () => {
      try {
        // Fetch a version endpoint with cache-busting
        const response = await fetch(`/api/version?t=${Date.now()}`, {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Compare versions - only show if server version is different from installed version
          const currentInstalledVersion = localStorage.getItem(INSTALLED_VERSION_KEY) || CURRENT_VERSION;
          
          if (data.version && data.version !== currentInstalledVersion) {
            // Check if user has already dismissed this version
            const dismissedVersion = localStorage.getItem(DISMISSED_VERSION_KEY);
            
            // Only show prompt if this version hasn't been dismissed
            if (dismissedVersion !== data.version) {
              setNewVersion(data.version);
              setShowUpdatePrompt(true);
            }
          }
        }
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.log('Version check failed:', error);
      }
    };

    // Check immediately on mount
    checkForUpdate();

    // Then check periodically
    const interval = setInterval(checkForUpdate, checkInterval);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    // Clear all caches and reload
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    // Update the installed version to the new version
    if (newVersion) {
      localStorage.setItem(INSTALLED_VERSION_KEY, newVersion);
    }
    // Clear the dismissed version so they see prompt for next update
    localStorage.removeItem(DISMISSED_VERSION_KEY);
    window.location.reload();
  };

  const handleDismiss = () => {
    // Store the dismissed version so prompt doesn't reappear
    if (newVersion) {
      localStorage.setItem(DISMISSED_VERSION_KEY, newVersion);
    }
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#181818',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '90vw',
      }}
    >
      <span>A new version is available!</span>
      <button
        onClick={handleRefresh}
        style={{
          backgroundColor: 'white',
          color: '#181818',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Refresh
      </button>
      <button
        onClick={handleDismiss}
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Later
      </button>
    </div>
  );
}
