# Caching Fix Implementation

This document explains the caching fixes implemented to prevent users from seeing stale data after deployments.

## Problem
Users were experiencing stale content after new deployments due to aggressive browser and Next.js caching mechanisms.

## Solutions Implemented

### 1. HTTP Cache-Control Headers (next.config.ts)
Added strict cache-control headers to force browsers to revalidate HTML pages:

```typescript
{
  source: "/:path*",
  headers: [
    { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
    { key: "Pragma", value: "no-cache" },
    { key: "Expires", value: "0" }
  ]
}
```

This ensures browsers always check with the server for the latest HTML, which references the correct hashed assets.

### 2. Version Checker System
Implemented a client-side version detection system that alerts users when a new deployment is available:

**Components:**
- `app/components/VersionChecker.tsx` - Client component that polls for version changes
- `app/api/version/route.ts` - API endpoint that returns current build version

**How it works:**
1. Every 5 minutes, the client checks the `/api/version` endpoint
2. Compares the server version with the client's current version
3. If different, shows a user-friendly prompt to refresh (only once per version)
4. If user dismisses, the prompt won't reappear for that version
5. On refresh, clears all caches and reloads the page

### 3. Service Worker Cache Strategy (public/sw.js)
Updated the service worker with a smarter caching strategy:

**Network-First for HTML/API:**
- HTML pages and API routes always fetch from network first
- Only falls back to cache when offline
- Prevents serving stale HTML that references old assets

**Cache-First for Static Assets:**
- Images, fonts, and other static assets use cache-first
- Improves performance while ensuring correctness

**Automatic Cache Cleanup:**
- Old caches are automatically deleted on activation
- Uses timestamp-based cache names to force invalidation

### 4. Build ID Generation
The build process now generates a unique build ID:

```bash
NEXT_PUBLIC_BUILD_ID=$(date +%s) next build
```

This ID is used by the version checker to detect new deployments.

## Usage

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The build script automatically generates a unique build ID.

### Deployment
When deploying to Vercel or other platforms:

1. The build process generates a new `NEXT_PUBLIC_BUILD_ID`
2. Service worker cache name changes, invalidating old caches
3. Version checker detects the new version
4. Users are prompted to refresh when they have an old version

## Testing

### Test Cache Invalidation
1. Deploy version A
2. Visit the site and note the version
3. Deploy version B
4. Wait up to 5 minutes (or refresh manually)
5. You should see the update prompt

### Test Offline Support
1. Visit the site while online
2. Go offline (disable network in DevTools)
3. Refresh the page
4. The cached version should still load

## Configuration

### Adjust Version Check Interval
In `app/components/VersionChecker.tsx`, modify:
```typescript
const checkInterval = 5 * 60 * 1000; // Change to desired milliseconds
```

### Customize Update Prompt
Edit the styling and messaging in `VersionChecker.tsx` to match your brand.

## Benefits

1. **No Stale Content**: Users always get the latest version after deployment
2. **User-Friendly**: Prompts users to refresh instead of breaking silently
3. **Offline Support**: Still works offline with cached content
4. **Performance**: Static assets are still cached for fast loading
5. **Automatic**: No manual intervention required

## Vercel-Specific Notes

If deploying to Vercel, the platform automatically:
- Sets appropriate cache headers for static assets
- Handles asset versioning with content hashes
- Provides CDN caching

The fixes implemented here complement Vercel's built-in caching and ensure HTML pages are always fresh.

## Troubleshooting

### Users Still See Old Version
1. Check that `NEXT_PUBLIC_BUILD_ID` is being set during build
2. Verify the `/api/version` endpoint returns the correct version
3. Check browser DevTools Network tab for cache headers
4. Clear browser cache manually as a last resort

### Version Checker Not Working
1. Ensure `VersionChecker` is imported in `app/layout.tsx`
2. Check browser console for errors
3. Verify the API route is accessible at `/api/version`

### Service Worker Issues
1. Unregister old service workers in DevTools > Application > Service Workers
2. Check that `sw.js` has correct cache-control headers in `next.config.ts`
3. Verify service worker is registered in `PWARegister.tsx`
