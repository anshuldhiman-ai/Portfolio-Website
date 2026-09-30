import type { Metadata } from 'next'
import './globals.css'
import { siteUrl } from './data/site'

const title = 'Anshul Dhiman - B.Tech CSE (AI & ML) Student'
const description = '2nd year B.Tech CSE (AI & ML) student at LPU Phagwara, originally from Hamirpur, HP. Building practical real-world software and learning by implementing.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: 'AI, ML, Portfolio, Machine Learning, Deep Learning, Anshul Dhiman, LPU, Student',
  openGraph: {
    title,
    description,
    url: '/',
    siteName: "Anshul Dhiman's Portfolio",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amaranth:wght@400;700&family=Archivo+Narrow:wght@400;500;600;700&family=Gruppo&family=Handlee&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
