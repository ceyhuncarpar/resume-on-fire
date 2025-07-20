import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Resume on Fire!',
  description: 'Build resumes, on fire!',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} antialiased bg-red-50`}
      >
        {children}
      </body>
    </html>
  )
}
