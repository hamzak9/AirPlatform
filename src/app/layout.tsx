import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://worksyops.com'),
  title: {
    default: 'Worksy Ops - Get units guest-ready, automatically',
    template: '%s | Worksy Ops',
  },
  description:
    'The complete operations platform for Airbnb property managers. Automate tasks, coordinate teams, and deliver 5-star guest experiences.',
  keywords: [
    'property management',
    'Airbnb management',
    'vacation rental software',
    'short-term rental',
    'property operations',
    'task automation',
    'housekeeping management',
  ],
  authors: [{ name: 'Worksy Ops' }],
  creator: 'Worksy Ops',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://worksyops.com',
    title: 'Worksy Ops - Get units guest-ready, automatically',
    description:
      'Automate tasks, coordinate teams, and deliver 5-star guest experiences with the complete operations platform for Airbnb property managers.',
    siteName: 'Worksy Ops',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worksy Ops - Get units guest-ready, automatically',
    description:
      'The complete operations platform for Airbnb property managers. Automate your operations today.',
    creator: '@worksyops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
