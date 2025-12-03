import { Anton, Inter, Big_Shoulders_Display } from 'next/font/google'

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

export const bigShouldersDisplay = Big_Shoulders_Display({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-big-shoulders',
})
