# Deployment Checklist - Caching Fix

Use this checklist before and after deploying the caching fixes.

## Pre-Deployment Checklist

### Code Review
- [x] All files created and modified correctly
- [x] No TypeScript errors
- [x] Build completes successfully
- [x] All components imported correctly

### Files to Commit
- [x] `next.config.ts` - Cache headers added
- [x] `app/layout.tsx` - VersionChecker imported
- [x] `app/components/VersionChecker.tsx` - New component
- [x] `app/api/version/route.ts` - New API route
- [x] `public/sw.js` - Updated service worker
- [x] `package.json` - Updated build script
- [x] `.env.local.example` - Environment template
- [x] Documentation files (optional but recommended)

### Local Testing
- [ ] Run `npm run build` - Should complete without errors
- [ ] Run `npm start` - Should start successfully
- [ ] Visit `http://localhost:3000` - Should load correctly
- [ ] Visit `http://localhost:3000/api/version` - Should return JSON
- [ ] Check DevTools Console - No errors
- [ ] Check DevTools Network - Cache headers present

## Git Commit

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Fix: Implement comprehensive caching solution

- Add cache-control headers for HTML pages
- Implement automatic version detection system
- Update service worker with smart caching strategy
- Add version API endpoint
- Ensure users always see latest version after deployment"

# Push to repository
git push origin main
```

## Deployment Steps

### For Vercel (Automatic)
1. [ ] Push code to repository
2. [ ] Vercel automatically detects changes
3. [ ] Build starts automatically
4. [ ] Wait for deployment to complete
5. [ ] Check deployment logs for errors

### For Manual Deployment
1. [ ] Set environment variable: `NEXT_PUBLIC_BUILD_ID`
2. [ ] Run build command
3. [ ] Deploy built files
4. [ ] Verify deployment successful

## Post-Deployment Verification

### Immediate Checks (0-5 minutes)
- [ ] Visit production URL - Site loads correctly
- [ ] Check `/api/version` endpoint - Returns version number
- [ ] Open DevTools > Network - Check cache headers on main document
- [ ] Open DevTools > Application > Service Workers - New SW registered
- [ ] Open DevTools > Application > Cache Storage - New cache created
- [ ] Check DevTools Console - No JavaScript errors

### Version API Check
```bash
# Should return: {"version":"1733123456789"}
curl https://your-domain.com/api/version
```

### Cache Headers Check
```bash
# Should include: Cache-Control: no-cache, no-store, must-revalidate
curl -I https://your-domain.com/
```

### Update Detection Test (5-10 minutes)
- [ ] Keep old version open in browser (don't refresh)
- [ ] Make a small change (e.g., update text)
- [ ] Deploy the change
- [ ] Wait 5 minutes
- [ ] Check if update prompt appears
- [ ] Click "Refresh" button
- [ ] Verify new version loads

### Browser Testing
Test in multiple browsers:
- [ ] Chrome/Edge (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop, if available)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS, if available)

For each browser:
- [ ] Site loads correctly
- [ ] No console errors
- [ ] Version checker works
- [ ] Service worker registers

### Performance Check
- [ ] Run Lighthouse audit
- [ ] Performance score maintained (>90)
- [ ] PWA score maintained (>90)
- [ ] No new warnings or errors

### Functionality Check
- [ ] Navigation works correctly
- [ ] All pages load
- [ ] Images load correctly
- [ ] Forms work (if applicable)
- [ ] PWA install prompt works
- [ ] Telegram button works

## Monitoring (First 24 Hours)

### Metrics to Watch
- [ ] Error rate in logs
- [ ] Page load times
- [ ] Version API response times
- [ ] Service worker registration rate
- [ ] User reports of issues

### Expected Behavior
- ✅ No increase in error rates
- ✅ Page load times similar or better
- ✅ Version API responds quickly (<100ms)
- ✅ Service worker registers successfully
- ✅ No user reports of stale content

## Rollback Plan (If Needed)

If issues occur:

### Quick Rollback
```bash
# Revert the commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

### Manual Rollback (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments
4. Find previous working deployment
5. Click "..." menu
6. Select "Promote to Production"

### After Rollback
- [ ] Verify site works correctly
- [ ] Investigate issue
- [ ] Fix and redeploy

## Success Criteria

All checks should pass:
- ✅ Build completes without errors
- ✅ Site loads correctly in production
- ✅ Version API returns correct data
- ✅ Cache headers applied correctly
- ✅ Service worker registers successfully
- ✅ Update detection works
- ✅ No increase in errors
- ✅ Performance maintained
- ✅ All browsers work correctly

## Common Issues & Solutions

### Issue: Version API returns 404
**Solution:** Verify `app/api/version/route.ts` was deployed

### Issue: Update prompt doesn't appear
**Solution:** 
1. Check browser console for errors
2. Verify versions are different
3. Wait full 5 minutes
4. Check VersionChecker is in layout.tsx

### Issue: Service worker not updating
**Solution:**
1. Unregister old service workers
2. Clear all caches
3. Hard refresh (Ctrl+Shift+R)

### Issue: Cache headers not applied
**Solution:**
1. Verify next.config.ts was deployed
2. Check Vercel deployment logs
3. Test with curl to see actual headers

### Issue: Build fails
**Solution:**
1. Check build logs for specific error
2. Verify all imports are correct
3. Run `npm run build` locally
4. Fix TypeScript errors

## Documentation

After successful deployment:
- [ ] Update team documentation
- [ ] Share deployment notes
- [ ] Document any issues encountered
- [ ] Update runbook if needed

## Notes

**Deployment Date:** _______________

**Deployed By:** _______________

**Deployment URL:** _______________

**Build ID:** _______________

**Issues Encountered:** 
- None / List any issues

**Resolution Time:** _______________

**Status:** [ ] Success | [ ] Partial | [ ] Rollback

---

## Next Steps After Successful Deployment

1. **Monitor for 24 hours** - Watch metrics and user feedback
2. **Test update flow** - Deploy a small change and verify detection
3. **Document learnings** - Note any issues or improvements
4. **Share with team** - Inform team of new caching behavior
5. **Plan next deployment** - Use this checklist for future deployments

---

**Remember:** The caching fix is designed to be zero-maintenance. Once deployed, it works automatically for all future deployments! 🎉
