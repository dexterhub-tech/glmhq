# Android Testing Guide

## Quick Test on Android Device

### Step 1: Get Your Computer's IP Address
**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x)

**Mac/Linux:**
```bash
ifconfig
```

### Step 2: Access from Android Device
1. Make sure your Android device is on the **same WiFi network** as your computer
2. Open **Chrome** on your Android device
3. Navigate to: `http://YOUR_IP:3001`
   - Example: `http://192.168.102.1:3001`

### Step 3: Test Checklist

#### Visual Rendering ✅
- [ ] Hero section background image is visible
- [ ] "JESUS LOVES YOU, YES YOU, EVEN YOU" text is visible and crisp
- [ ] "WELCOME TO A PLACE OF INTIMACY..." text is visible
- [ ] "CONNECT WITH US" button is visible with white border and semi-transparent background
- [ ] GLM logo in navigation is visible
- [ ] Navigation menu (hamburger icon) is visible

#### Functionality ✅
- [ ] Tap the hamburger menu - mobile menu should slide in from left
- [ ] Tap "CONNECT WITH US" button - should be clickable
- [ ] Scroll down - navigation should stay fixed at top
- [ ] Scroll down - address bar hides/shows without layout jumping
- [ ] All sections load and display properly

#### Performance ✅
- [ ] Page loads within 3-5 seconds
- [ ] Scrolling is smooth (no jank)
- [ ] No white screens or blank areas
- [ ] Images load properly
- [ ] Transitions are smooth

### Step 4: Test Different Android Browsers

#### Chrome Mobile (Primary)
- Most common Android browser
- Should work perfectly with all fixes

#### Samsung Internet
- Pre-installed on Samsung devices
- Test if you have a Samsung device

#### Firefox Mobile
- Alternative browser
- Should also work with fixes

### Common Issues & Solutions

#### Issue: "This site can't be reached"
**Solution:** 
- Verify both devices are on same WiFi
- Check firewall isn't blocking port 3001
- Try disabling Windows Firewall temporarily

#### Issue: Page loads but looks broken
**Solution:**
- Hard refresh: Chrome menu → Settings → Clear browsing data
- Close and reopen Chrome
- Try incognito mode

#### Issue: Background image not showing
**Solution:**
- Check network speed (background image might be loading)
- Wait 5-10 seconds for image to load
- Check browser console for errors

#### Issue: Buttons not visible
**Solution:**
- This was the main bug - should be fixed now
- If still not visible, clear cache and hard refresh

### Advanced Testing (Optional)

#### Chrome DevTools Remote Debugging
1. On computer: Open Chrome → `chrome://inspect`
2. On Android: Enable Developer Options → USB Debugging
3. Connect Android device via USB
4. Click "Inspect" on your device in Chrome DevTools
5. View console errors and network requests

#### Test on Different Screen Sizes
- Small phone (< 375px width)
- Medium phone (375px - 428px)
- Large phone (> 428px)
- Tablet (768px+)

#### Test Different Android Versions
- Android 10+: Should work perfectly
- Android 8-9: Should work with minor differences
- Android 7 and below: May have some issues

### Performance Metrics to Check

#### Load Time
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

#### Rendering
- No layout shifts (CLS < 0.1)
- Smooth 60fps scrolling
- No jank or stuttering

### What to Report

If you find issues, report:
1. **Device**: Make/model (e.g., Samsung Galaxy S21)
2. **Android Version**: (e.g., Android 12)
3. **Browser**: Chrome/Samsung Internet/Firefox + version
4. **Issue**: Detailed description
5. **Screenshot**: If possible
6. **Console Errors**: If using remote debugging

### Expected Behavior (After Fixes)

✅ **Hero Section**
- Background image visible and crisp
- Text clearly readable with good contrast
- Button visible with white border and glass effect
- Proper spacing and centering

✅ **Navigation**
- Fixed at top, doesn't move when scrolling
- Logo visible and crisp
- Hamburger menu works smoothly
- Mobile menu slides in/out properly

✅ **Overall**
- No white screens
- No missing content
- Smooth scrolling
- Fast loading
- Identical to iOS experience

### Network Access URL

Your application is accessible at:
- **Local (on your computer):** http://localhost:3001
- **Network (on Android device):** http://192.168.102.1:3001

Replace `192.168.102.1` with your actual IP address from Step 1.

### Need Help?

If issues persist:
1. Check `ANDROID_RENDERING_FIXES.md` for technical details
2. Review browser console for errors
3. Test on different Android device if available
4. Try different WiFi network
5. Restart dev server: `npm run dev`

## Quick Commands

```bash
# Start dev server
npm run dev

# Check IP address (Windows)
ipconfig

# Check IP address (Mac/Linux)
ifconfig

# Build for production (optional)
npm run build
npm run start
```

