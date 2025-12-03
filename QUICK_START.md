# Quick Start Guide - PWA & Android Fixes

## What Was Done

✅ **Favicon Setup** - Using glm-logo.png across all browsers
✅ **PWA Configuration** - Full Progressive Web App support
✅ **Android UI/UX Fixes** - Consistent rendering across all devices

---

## Immediate Testing Steps

### 1. Build & Run
```bash
# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Start production server
npm run start
```

### 2. Test PWA Locally
1. Open http://localhost:3000 in Chrome
2. Open DevTools (F12) → Application tab
3. Check "Manifest" section - should show GLM HQ
4. Check "Service Workers" - should show registered
5. Try offline mode: Network tab → Offline checkbox

### 3. Test on Mobile
```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile device on same WiFi
http://YOUR_IP:3000
```

**On Android:**
- Chrome should show "Install app" prompt
- Tap to install to home screen
- Open app - should work standalone

**On iOS:**
- Safari → Share → Add to Home Screen
- Open app - should work standalone

---

## Key Files to Know

### Configuration
- `app/layout.tsx` - PWA metadata & viewport settings
- `next.config.ts` - Service worker headers
- `public/manifest.json` - PWA configuration

### Android Fixes
- `app/android-fixes.css` - All Android-specific CSS
- `app/components/ViewportFix.tsx` - Viewport height fix
- `app/globals.css` - Base mobile fixes

### PWA
- `public/sw.js` - Service worker (caching)
- `app/components/PWARegister.tsx` - SW registration
- `public/icon*.png` - App icons

---

## Common Issues

### "PWA not installing"
- ✅ Must use HTTPS (or localhost)
- ✅ Check manifest.json is accessible
- ✅ Verify service worker registered

### "Android still looks different"
- ✅ Clear browser cache
- ✅ Test on real device (not emulator)
- ✅ Check android-fixes.css is imported

### "Service worker not updating"
- ✅ Update CACHE_NAME in sw.js
- ✅ Hard refresh (Ctrl+Shift+R)
- ✅ Unregister old SW in DevTools

---

## Deployment Checklist

Before deploying:
- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Verify PWA works in production mode
- [ ] Test on real Android device
- [ ] Test on real iOS device
- [ ] Check all icons load
- [ ] Verify offline mode works

After deploying:
- [ ] Test PWA installation on production URL
- [ ] Verify HTTPS is working
- [ ] Check manifest.json is accessible
- [ ] Test on multiple Android devices
- [ ] Compare Android vs iOS rendering
- [ ] Monitor for errors in production

---

## Testing Checklist

### Desktop (Chrome)
- [ ] Favicon in tab
- [ ] Install prompt appears
- [ ] Offline mode works

### Android
- [ ] Install prompt appears
- [ ] App installs to home screen
- [ ] Standalone mode works
- [ ] No viewport jumping
- [ ] Fixed nav stays in place
- [ ] Smooth scrolling
- [ ] No input zoom
- [ ] SVGs render correctly

### iOS
- [ ] Add to Home Screen works
- [ ] Standalone mode works
- [ ] UI matches Android

---

## Documentation

📖 **Full Documentation**: See `PWA_SETUP_GUIDE.md`
🔧 **Android Fixes**: See `ANDROID_FIX_SUMMARY.md`

---

## Need Help?

1. Check browser console for errors
2. Review documentation files
3. Test on real devices (not just emulators)
4. Compare with iOS to identify differences

---

## Quick Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint

# Clear Next.js cache
rm -rf .next
```

---

## Success Indicators

✅ PWA badge in Chrome address bar
✅ Install prompt appears on mobile
✅ App works offline after first visit
✅ Android and iOS look identical
✅ No viewport jumping on scroll
✅ Smooth performance on mobile

---

**Ready to test!** Start with `npm run build && npm run start`
