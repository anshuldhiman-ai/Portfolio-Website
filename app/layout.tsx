import type { Metadata } from 'next'
import './globals.css'
import { siteUrl } from './data/site'

const title = 'Anshul Dhiman - AI / ML Engineer & Computer Vision Developer'
const description = '2nd-year B.Tech CSE (AI & ML) student at LPU Phagwara. Building real-time computer vision pipelines (YOLOv8, ONNX), privacy-first LLM applications (Ollama, scikit-learn), and evaluated RAG systems.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Anshul Dhiman',
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Vision',
    'YOLOv8',
    'OpenCV',
    'ONNX Runtime',
    'PyTorch',
    'RAG',
    'LPU',
    'Portfolio'
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Anshul Dhiman's Engineering Portfolio",
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Anshul Dhiman - AI / ML Engineer Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anshul Dhiman',
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: 'AI / ML Engineer & B.Tech CSE (AI & ML) Student',
  worksFor: {
    '@type': 'EducationalOrganization',
    name: 'Lovely Professional University',
  },
  knowsAbout: [
    'Machine Learning',
    'Artificial Intelligence',
    'Computer Vision',
    'YOLOv8',
    'OpenCV',
    'ONNX Runtime',
    'PyTorch',
    'RAG & LLMs',
    'Python',
    'FastAPI',
    'Docker',
    'Data Structures & Algorithms',
  ],
  email: 'anshul.dhiman.ml@gmail.com',
  sameAs: [
    'https://github.com/anshuldhiman-ai',
    'https://linkedin.com/in/anshul-dhiman-ai',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/profile.png" />
        <link rel="apple-touch-icon" href="/profile.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

