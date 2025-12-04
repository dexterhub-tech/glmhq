'use client';

import { useEffect } from 'react';

export default function VersionChecker() {
  useEffect(() => {
    // Listen for messages from the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'RELOAD_PAGE') {
          // Clear all caches before reloading
          if ('caches' in window) {
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
            });
          }
          // Reload the page to get the new version
          window.location.reload();
        }
      });
    }
  }, []);

  // No UI - updates happen silently
  return null;
}
