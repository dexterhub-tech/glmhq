# Caching Fix Test Checklist

Use this checklist to verify the caching fixes are working correctly.

## Pre-Deployment Tests (Local)

### 1. Build Test
```bash
npm run build
npm start
```
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Server starts on port 3000

### 2. Version API Test
- [ ] Visit: http://localhost:3000/api/version
- [ ] Should return JSON: `{"version":"..."}`
- [ ] Version should be a timestamp or build ID

### 3. Version Checker Test
- [ ] Open http://localhost:3000
- [ ] Open DevTools Console
- [ ] Should see version check logs (or no errors)
- [ ] No update prompt should appear (same version)

### 4. Service Worker Test
- [ ] Open DevTools > Application > Service Workers
- [ ] Should see service worker registered
- [ ] Cache name should include timestamp
- [ ] Check Cache Storage - should see cached assets

### 5. Cache Headers Test
- [ ] Open DevTools > Network tab
- [ ] Reload the page
- [ ] Click on the main document (usually just "/")
- [ ] Check Response Headers:
  - [ ] `Cache-Control: no-cache, no-store, must-revalidate`
  - [ ] `Pragma: no-cache`
  - [ ] `Expires: 0`

## Post-Deployment Tests (Production)

### 1. Initial Deployment
- [ ] Deploy to Vercel/production
- [ ] Visit your production URL
- [ ] Verify site loads correctly
- [ ] Check `/api/version` endpoint
- [ ] Note the version number

### 2. Update Detection Test
- [ ] Make a small change (e.g., update a text string)
- [ ] Deploy the new version
- [ ] Keep the old version open in a browser (don't refresh)
- [ ] Wait 5 minutes OR manually trigger check in console:
  ```javascript
  fetch('/api/version?t=' + Date.now()).then(r => r.json()).then(console.log)
  ```
- [ ] Should see update prompt appear
- [ ] Click "Refresh" button
- [ ] Should see new version

### 3. Hard Refresh Test
- [ ] Visit the site
- [ ] Make a deployment
- [ ] Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Should see new version immediately (no prompt needed)

### 4. Offline Test
- [ ] Visit the site while online
- [ ] Open DevTools > Network tab
- [ ] Check "Offline" checkbox
- [ ] Refresh the page
- [ ] Site should still load (from cache)
- [ ] Basic functionality should work

### 5. Multiple Tabs Test
- [ ] Open site in multiple tabs
- [ ] Deploy a new version
- [ ] Wait 5 minutes
- [ ] All tabs should show update prompt
- [ ] Refresh one tab
- [ ] Other tabs should still work until refreshed

## Browser Compatibility Tests

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

For each browser:
- [ ] Version checker works
- [ ] Update prompt appears
- [ ] Refresh button works
- [ ] Service worker registers

## Performance Tests

### 1. First Load
- [ ] Open DevTools > Network tab
- [ ] Clear cache
- [ ] Reload page
- [ ] Check load time (should be normal)

### 2. Cached Load
- [ ] Reload page again
- [ ] Static assets should load from cache (faster)
- [ ] HTML should still fetch from network

### 3. Lighthouse Test
- [ ] Run Lighthouse audit
- [ ] PWA score should still be good
- [ ] Performance should be maintained

## Edge Cases

### 1. Rapid Deployments
- [ ] Deploy version A
- [ ] Immediately deploy version B
- [ ] Version checker should handle gracefully

### 2. API Failure
- [ ] Block `/api/version` in DevTools
- [ ] Version checker should fail silently
- [ ] No errors in console (or only logged, not thrown)

### 3. Old Service Worker
- [ ] Manually register an old service worker
- [ ] Deploy new version
- [ ] Old service worker should be replaced

## Troubleshooting Checklist

If tests fail:

### Version Checker Not Working
- [ ] Check `VersionChecker` is in `app/layout.tsx`
- [ ] Check browser console for errors
- [ ] Verify `/api/version` is accessible
- [ ] Check `NEXT_PUBLIC_BUILD_ID` is set

### Update Prompt Not Appearing
- [ ] Verify versions are actually different
- [ ] Check 5-minute interval hasn't passed yet
- [ ] Look for JavaScript errors in console
- [ ] Verify component is rendering (check React DevTools)

### Service Worker Issues
- [ ] Unregister all service workers
- [ ] Clear all caches
- [ ] Hard refresh
- [ ] Check `sw.js` is accessible at `/sw.js`

### Cache Headers Not Applied
- [ ] Check `next.config.ts` headers configuration
- [ ] Verify Vercel deployment includes config
- [ ] Check actual response headers in Network tab
- [ ] Try different routes

## Success Criteria

All tests should pass with:
- ✅ No TypeScript errors
- ✅ No runtime errors in console
- ✅ Version checker detects updates
- ✅ Update prompt appears and works
- ✅ Service worker caches correctly
- ✅ Cache headers prevent stale HTML
- ✅ Performance maintained
- ✅ Offline support works

## Notes

- Version checks happen every 5 minutes by default
- Service worker updates happen on page load
- Cache headers apply to all routes
- Static assets are still cached for performance

---

**Status:** [ ] All tests passed | [ ] Some tests failed (see notes)

**Date Tested:** _______________

**Tested By:** _______________

**Notes:**
