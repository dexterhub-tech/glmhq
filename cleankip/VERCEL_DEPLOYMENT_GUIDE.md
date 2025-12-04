# Vercel Deployment Guide - Android Rendering Fixes

## Problem
Vercel builds are failing or showing warnings about ignored build scripts for:
- `@tailwindcss/oxide` (Tailwind CSS v4 compiler)
- `sharp` (image processing)
- `unrs-resolver` (dependency resolver)

This prevents the Android rendering fixes from being compiled and deployed.

## Solution

### Step 1: Add `.npmrc` Configuration ✅

I've created a `.npmrc` file in the root of your project with the following configuration:

```
# Enable build scripts for required packages
# This is needed for Tailwind CSS v4 (@tailwindcss/oxide), Sharp (image processing), and other native dependencies
enable-pre-post-scripts=true

# Vercel deployment configuration
# This ensures that build scripts run during Vercel builds
auto-install-peers=true
strict-peer-dependencies=false
```

This tells pnpm to allow these packages to run their build scripts during deployment.

### Step 2: Commit and Push Changes

Run the following commands to commit the `.npmrc` file and push to Vercel:

```bash
# Add the .npmrc file
git add .npmrc

# Commit with a descriptive message
git commit -m "Add .npmrc to enable build scripts for Vercel deployment"

# Push to your main branch (triggers Vercel deployment)
git push origin main
```

### Step 3: Verify Vercel Deployment

1. **Go to your Vercel dashboard**: https://vercel.com/dashboard
2. **Check the deployment logs** for your project
3. **Look for these indicators of success**:
   - ✅ No warnings about "Ignored build scripts"
   - ✅ `@tailwindcss/oxide` builds successfully
   - ✅ Build completes without errors
   - ✅ Deployment succeeds

### Step 4: Test on Android

After successful deployment:

1. **Open your Vercel URL** on an Android device (e.g., `https://glmhq.vercel.app`)
2. **Verify the following**:
   - ✅ Hero section background image is visible
   - ✅ "CONNECT WITH US" button is visible and styled
   - ✅ Text is crisp and readable
   - ✅ Navigation works properly
   - ✅ No white screens or missing content
   - ✅ Smooth scrolling

## What This Fixes

### Before `.npmrc`:
- ❌ pnpm blocks build scripts for security
- ❌ Tailwind CSS v4 compiler doesn't build
- ❌ Android-specific CSS fixes don't compile
- ❌ Buttons and UI elements don't render properly on Android
- ❌ Background images don't load

### After `.npmrc`:
- ✅ Build scripts are allowed to run
- ✅ Tailwind CSS v4 compiles properly
- ✅ All Android fixes are compiled and deployed
- ✅ Buttons and UI elements render correctly
- ✅ Background images load properly
- ✅ Android experience matches iOS

## Alternative: Vercel Environment Variables (Optional)

If you prefer not to use `.npmrc`, you can also configure this in Vercel:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add the following:
   - **Key**: `ENABLE_PRE_POST_SCRIPTS`
   - **Value**: `true`
   - **Environment**: Production, Preview, Development

However, using `.npmrc` is the recommended approach as it works consistently across all environments.

## Troubleshooting

### Issue: Still seeing "Ignored build scripts" warning

**Solution**:
1. Make sure `.npmrc` is committed and pushed
2. Check that the file is in the root directory (not in a subdirectory)
3. Verify the file content matches the example above
4. Trigger a new deployment in Vercel

### Issue: Build fails with "Cannot find module"

**Solution**:
1. Clear Vercel build cache: Settings → General → Clear Build Cache
2. Trigger a new deployment
3. Check that all dependencies are in `package.json`

### Issue: Android still not rendering properly

**Solution**:
1. Hard refresh on Android device (clear browser cache)
2. Check Vercel deployment logs for any errors
3. Verify that the deployment succeeded
4. Check browser console for JavaScript errors

### Issue: pnpm version mismatch

**Solution**:
Add a `packageManager` field to `package.json`:
```json
{
  "packageManager": "pnpm@9.0.0"
}
```

## Files Changed

### New Files:
- ✅ `.npmrc` - pnpm configuration for build scripts

### Previously Committed (Android Fixes):
- ✅ `app/android-fixes.css` - Comprehensive Android CSS fixes
- ✅ `app/layout.tsx` - Updated viewport and meta tags
- ✅ `app/components/HeroSection.tsx` - Android-safe viewport height
- ✅ `ANDROID_RENDERING_FIXES.md` - Technical documentation
- ✅ `ANDROID_TESTING_GUIDE.md` - Testing instructions

## Deployment Checklist

Before deploying to Vercel:
- [ ] `.npmrc` file is created in root directory
- [ ] `.npmrc` is committed to git
- [ ] Changes are pushed to main branch
- [ ] Vercel deployment is triggered
- [ ] Deployment logs show no warnings about build scripts
- [ ] Build completes successfully
- [ ] Test on Android device after deployment

After deployment:
- [ ] Android rendering is correct
- [ ] All UI elements are visible
- [ ] Background images load
- [ ] Buttons are styled properly
- [ ] Navigation works
- [ ] Performance is good (smooth scrolling)

## Expected Build Output

When the deployment is successful, you should see in Vercel logs:

```
✓ Installing dependencies...
✓ Building @tailwindcss/oxide...
✓ Building sharp...
✓ Building unrs-resolver...
✓ Compiling...
✓ Linting and checking validity of types...
✓ Creating an optimized production build...
✓ Compiled successfully
```

## Next Steps

1. **Commit the `.npmrc` file** (see Step 2 above)
2. **Push to GitHub** to trigger Vercel deployment
3. **Monitor the deployment** in Vercel dashboard
4. **Test on Android** after successful deployment
5. **Report any issues** if problems persist

## Support

If you continue to experience issues:
1. Check Vercel deployment logs for specific errors
2. Verify `.npmrc` is in the root directory
3. Clear Vercel build cache and redeploy
4. Check that all Android fix files are committed
5. Test locally first with `pnpm build` to ensure it works

## Summary

The `.npmrc` file is the key to fixing the Vercel deployment issue. It allows pnpm to run the necessary build scripts for Tailwind CSS v4 and other native dependencies, which are required for the Android rendering fixes to work properly.

**Just commit and push the `.npmrc` file, and your Vercel deployment should work perfectly!** 🚀

