import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond, Special_Elite, Inter } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/BottomNav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-mgp-body-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-mgp-display-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const specialElite = Special_Elite({
  variable: '--font-mgp-stamp-mono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'My Golf Passport',
  description: 'Track the golf courses you have played',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cormorant.variable} ${specialElite.variable}`}
    >
      <body style={{ margin: 0, padding: 0 }}>
        <div
          className="mgp-app-shell mgp-bottom-nav-safe"
          style={{
            maxWidth: 430,
            margin: '0 auto',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  )
}
