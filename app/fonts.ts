import { Anton, Inter } from 'next/font/google'

export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Big Shoulders Display - loaded via Google Fonts CDN in layout.tsx
// This approach is used for compatibility with Next.js 15.5+
export const bigShouldersDisplay = {
  variable: '--font-big-shoulders',
  className: '',
}

