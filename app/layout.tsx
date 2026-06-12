import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HandbookProvider from './handbook/HandbookProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PAI — Learn AI',
  description: 'Your personal AI learning buddy',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-full">
        {children}
        <HandbookProvider />
      </body>
    </html>
  )
}
