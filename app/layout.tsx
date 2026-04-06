import type { Metadata } from 'next'
import { Newsreader, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Seminario Online – Liberación de todos los miedos | Susana Majul',
  description:
    'Un viaje hacia la claridad. Encuentra la paz interior a través de la sabiduría ancestral y la presencia consciente. 3 de Mayo de 2026.',
  generator: 'v0.app',
  metadataBase: new URL('https://invitacion-seminario-demo.vercel.app'),
  openGraph: {
    title: 'Seminario Online – Liberación de todos los miedos | Susana Majul',
    description:
      'Un viaje hacia la claridad. Encuentra la paz interior a través de la sabiduría ancestral y la presencia consciente. 3 de Mayo de 2026.',
    url: 'https://invitacion-seminario-demo.vercel.app',
    siteName: 'Susana Majul – Bombones para el Alma',
    images: [
      {
        url: 'https://invitacion-seminario-demo.vercel.app/images/opengraph.webp',
        width: 1200,
        height: 630,
        alt: 'Susana Majul – Seminario Online: Liberación de todos los miedos',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seminario Online – Liberación de todos los miedos | Susana Majul',
    description:
      'Un viaje hacia la claridad. Encuentra la paz interior a través de la sabiduría ancestral y la presencia consciente. 3 de Mayo de 2026.',
    images: ['https://invitacion-seminario-demo.vercel.app/images/opengraph.webp'],
  },
}

export const viewport = {
  themeColor: '#FAF9F7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className={`${newsreader.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
