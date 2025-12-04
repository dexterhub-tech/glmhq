# Quick Setup Guide - Caching Fix

## What Was Fixed

Your app now has a comprehensive caching solution that prevents users from seeing stale content after deployments.

## Files Modified/Created

### Modified Files:
1. **next.config.ts** - Added cache-control headers for HTML pages
2. **app/layout.tsx** - Added VersionChecker component
3. **public/sw.js** - Updated service worker with better cache strategy
4. **package.json** - Updated build script

### New Files:
1. **app/components/VersionChecker.tsx** - Detects new versions and prompts users
2. **app/api/version/route.ts** - API endpoint for version checking
3. **.env.local.example** - Environment variable template
4. **CACHING_IMPLEMENTATION.md** - Detailed documentation

## How It Works

### 1. HTTP Headers
- HTML pages now have `no-cache` headers
- Forces browsers to always check server for latest version
- Static assets (JS, CSS, images) still cached for performance

### 2. Version Detection
- Client checks for new version every 5 minutes
- When detected, shows a friendly "Update Available" prompt
- User can refresh immediately or continue and refresh later

### 3. Service Worker
- Network-first for HTML and API routes (always fresh)
- Cache-first for static assets (fast loading)
- Automatic cleanup of old caches

## Testing Locally

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

3. **Test version detection:**
   - Open the app in your browser
   - Open DevTools Console
   - You should see the version checker running
   - The `/api/version` endpoint should return a version number

## Deploying to Vercel

### Option 1: Automatic (Recommended)
Just push to your repository. Vercel will:
- Run the build script
- Generate a unique build ID automatically
- Deploy with all caching fixes active

### Option 2: Manual Build ID
Set an environment variable in Vercel dashboard:
1. Go to Project Settings > Environment Variables
2. Add: `NEXT_PUBLIC_BUILD_ID` = `${Date.now()}`
3. Redeploy

## Verifying It Works

After deployment:

1. **Check Headers:**
   - Open DevTools > Network tab
   - Reload the page
   - Check the main document response headers
   - Should see: `Cache-Control: no-cache, no-store, must-revalidate`

2. **Check Version API:**
   - Visit: `https://your-domain.com/api/version`
   - Should return: `{"version":"1234567890"}`

3. **Test Update Detection:**
   - Deploy a new version
   - Keep the old version open in a browser
   - Wait 5 minutes (or check console for version check logs)
   - Should see update prompt appear

## Customization

### Change Check Interval
Edit `app/components/VersionChecker.tsx`:
```typescript
const checkInterval = 5 * 60 * 1000; // 5 minutes (in milliseconds)
```

### Customize Update Prompt
Edit the styling in `VersionChecker.tsx` to match your design.

### Disable Version Checker
Remove `<VersionChecker />` from `app/layout.tsx` (not recommended).

## Troubleshooting

### "Version check failed" in console
- Normal if `/api/version` isn't accessible yet
- Check that the API route exists at `app/api/version/route.ts`

### Users still see old content
1. Check Vercel deployment logs for build ID
2. Verify `/api/version` returns the new version
3. Ask users to hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser DevTools > Application > Cache Storage

### Service worker not updating
1. Go to DevTools > Application > Service Workers
2. Click "Unregister" on old service workers
3. Refresh the page
4. New service worker should install

## Next Steps

1. **Deploy to production** and test the update flow
2. **Monitor** the version checker in production
3. **Customize** the update prompt styling if needed
4. **Consider** adding analytics to track how often users see the prompt

## Support

If you encounter issues:
1. Check `CACHING_IMPLEMENTATION.md` for detailed documentation
2. Review browser console for errors
3. Check Vercel deployment logs
4. Verify all files were deployed correctly

---

**Summary:** Your app now has enterprise-grade caching that ensures users always see the latest version while maintaining excellent performance. The version checker provides a smooth user experience when updates are available.
