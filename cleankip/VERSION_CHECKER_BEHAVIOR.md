# Version Checker Behavior

## How It Works

The VersionChecker component now uses localStorage to track which versions have been dismissed by the user, ensuring the update prompt appears only once per new version.

## User Experience Flow

### Scenario 1: User Refreshes Immediately
```
1. New version deployed (v2)
2. User sees "Update Available" prompt
3. User clicks "Refresh" button
4. Page reloads with new version
5. ✅ User is on v2
```

### Scenario 2: User Dismisses Prompt
```
1. New version deployed (v2)
2. User sees "Update Available" prompt
3. User clicks "Later" button
4. Prompt disappears and won't reappear
5. User continues working on v1
6. User manually refreshes later (Ctrl+R)
7. ✅ User is on v2 (no prompt needed)
```

### Scenario 3: Multiple Deployments
```
1. New version deployed (v2)
2. User sees prompt, clicks "Later"
3. Prompt disappears
4. Another version deployed (v3)
5. User sees NEW prompt for v3
6. ✅ Each version gets one prompt
```

## Technical Implementation

### localStorage Key
```javascript
const DISMISSED_VERSION_KEY = 'glm_dismissed_version';
```

### Storage Logic
- **When prompt appears**: Check if current server version has been dismissed
- **When user clicks "Later"**: Store the version number in localStorage
- **When user clicks "Refresh"**: Clear localStorage and reload (so they see next update)

### Code Flow
```javascript
// Check if version was dismissed
const dismissedVersion = localStorage.getItem(DISMISSED_VERSION_KEY);

// Only show if not dismissed
if (dismissedVersion !== data.version) {
  setShowUpdatePrompt(true);
}

// On dismiss
localStorage.setItem(DISMISSED_VERSION_KEY, newVersion);

// On refresh
localStorage.removeItem(DISMISSED_VERSION_KEY);
window.location.reload();
```

## Benefits

### 1. Non-Intrusive
- Prompt appears only once
- User can dismiss and continue working
- No repeated interruptions

### 2. Persistent Across Sessions
- If user closes browser after dismissing
- Prompt won't reappear when they return
- Only new versions trigger new prompts

### 3. Smart Reset
- When user refreshes, localStorage is cleared
- They'll see prompt for next version
- Ensures they're always notified of updates

## Edge Cases Handled

### Case 1: User Never Refreshes
- Prompt appears once for v2
- User dismisses and continues on v1
- Eventually they'll manually refresh or close/reopen
- They'll get v2 (or latest) without prompt

### Case 2: Rapid Deployments
- v2 deployed → User dismisses
- v3 deployed → User sees new prompt
- Each version gets its own notification

### Case 3: localStorage Cleared
- If user clears browser data
- They'll see prompt again for current version
- This is acceptable behavior

### Case 4: Multiple Tabs
- Each tab has its own VersionChecker
- Dismissing in one tab doesn't affect others
- localStorage is shared, so dismissal applies to all tabs

## Testing

### Test 1: Dismiss Behavior
```
1. Deploy new version
2. Wait for prompt
3. Click "Later"
4. Verify prompt disappears
5. Wait 5+ minutes
6. Verify prompt doesn't reappear ✅
```

### Test 2: Refresh Behavior
```
1. Deploy new version
2. Wait for prompt
3. Click "Refresh"
4. Verify page reloads
5. Deploy another version
6. Verify new prompt appears ✅
```

### Test 3: Multiple Versions
```
1. Deploy v2, dismiss prompt
2. Deploy v3
3. Verify new prompt appears ✅
```

## localStorage Inspection

### View Stored Version
```javascript
// In browser console
localStorage.getItem('glm_dismissed_version')
// Returns: "1733123456789" or null
```

### Clear Stored Version
```javascript
// In browser console
localStorage.removeItem('glm_dismissed_version')
// Prompt will reappear on next check
```

### View All localStorage
```javascript
// In browser console
console.log(localStorage)
```

## Configuration

### Change Storage Key
Edit `app/components/VersionChecker.tsx`:
```typescript
const DISMISSED_VERSION_KEY = 'your_custom_key';
```

### Disable Persistence (Always Show)
Remove the localStorage check:
```typescript
// Remove this check:
if (dismissedVersion !== data.version) {
  setShowUpdatePrompt(true);
}

// Replace with:
setShowUpdatePrompt(true);
```

## User Instructions

### For End Users
**If you see "Update Available":**
- Click **"Refresh"** to update immediately (recommended)
- Click **"Later"** to continue working and update later
- The prompt won't bother you again for this version

**To manually update:**
- Press Ctrl+Shift+R (Windows/Linux)
- Press Cmd+Shift+R (Mac)
- Or just refresh normally (Ctrl+R / Cmd+R)

### For Developers
**Testing the prompt:**
```javascript
// Force show prompt by clearing localStorage
localStorage.removeItem('glm_dismissed_version');
// Then wait for next version check (up to 5 minutes)
```

## Comparison: Before vs After

### Before (Annoying)
```
User dismisses prompt
↓
5 minutes pass
↓
Prompt reappears ❌
↓
User dismisses again
↓
5 minutes pass
↓
Prompt reappears again ❌
↓
User gets frustrated 😤
```

### After (Better UX)
```
User dismisses prompt
↓
5 minutes pass
↓
No prompt (version already dismissed) ✅
↓
User continues working happily 😊
↓
New version deployed
↓
New prompt appears (for new version) ✅
```

## Summary

✅ **Prompt appears once per version**  
✅ **User can dismiss without repeated interruptions**  
✅ **New versions still trigger new prompts**  
✅ **Refreshing clears dismissal for next update**  
✅ **Better user experience overall**  

---

**The update prompt is now respectful of user choice while still ensuring they're notified of important updates!** 🎉
