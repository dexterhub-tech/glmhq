#!/usr/bin/env node

/**
 * Verification script for PWA and Android fixes implementation
 * Run with: node verify-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying PWA and Android Fixes Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - MISSING: ${filePath}`);
    checks.failed++;
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(searchString)) {
      console.log(`✅ ${description}`);
      checks.passed++;
      return true;
    } else {
      console.log(`⚠️  ${description} - Content not found`);
      checks.warnings++;
      return false;
    }
  } else {
    console.log(`❌ ${description} - File missing: ${filePath}`);
    checks.failed++;
    return false;
  }
}

console.log('📁 Checking PWA Files...');
checkFile('public/manifest.json', 'PWA Manifest');
checkFile('public/sw.js', 'Service Worker');
checkFile('public/icon.png', 'App Icon (base)');
checkFile('public/icon-192.png', 'App Icon (192x192)');
checkFile('public/icon-512.png', 'App Icon (512x512)');
checkFile('public/robots.txt', 'Robots.txt');

console.log('\n📱 Checking Component Files...');
checkFile('app/components/PWARegister.tsx', 'PWA Register Component');
checkFile('app/components/ViewportFix.tsx', 'Viewport Fix Component');

console.log('\n🎨 Checking CSS Files...');
checkFile('app/android-fixes.css', 'Android Fixes CSS');
checkFile('app/globals.css', 'Global CSS');

console.log('\n⚙️  Checking Configuration...');
checkFileContent('app/layout.tsx', 'PWARegister', 'PWA Register imported in layout');
checkFileContent('app/layout.tsx', 'ViewportFix', 'Viewport Fix imported in layout');
checkFileContent('app/layout.tsx', 'android-fixes.css', 'Android fixes CSS imported');
checkFileContent('app/layout.tsx', 'manifest', 'Manifest configured in metadata');
checkFileContent('next.config.ts', 'sw.js', 'Service Worker headers configured');

console.log('\n📚 Checking Documentation...');
checkFile('PWA_SETUP_GUIDE.md', 'PWA Setup Guide');
checkFile('ANDROID_FIX_SUMMARY.md', 'Android Fix Summary');
checkFile('QUICK_START.md', 'Quick Start Guide');
checkFile('IMPLEMENTATION_SUMMARY.md', 'Implementation Summary');

console.log('\n' + '='.repeat(50));
console.log('📊 Verification Results:');
console.log('='.repeat(50));
console.log(`✅ Passed: ${checks.passed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log('='.repeat(50));

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 All checks passed! Setup is complete.');
  console.log('\n📝 Next Steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: npm run start');
  console.log('   3. Test PWA at http://localhost:3000');
  console.log('   4. Test on real Android device');
  console.log('   5. Test on real iOS device');
  console.log('\n📖 See QUICK_START.md for detailed testing instructions.');
  process.exit(0);
} else if (checks.failed === 0) {
  console.log('\n⚠️  Setup complete with warnings. Review warnings above.');
  console.log('\n📖 See documentation files for more information.');
  process.exit(0);
} else {
  console.log('\n❌ Setup incomplete. Please fix the failed checks above.');
  console.log('\n📖 See IMPLEMENTATION_SUMMARY.md for setup details.');
  process.exit(1);
}
