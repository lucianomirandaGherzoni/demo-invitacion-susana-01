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
  title: 'MI NUEVO YO - SUSANA MAJUL',
  description:
    'Apertura de Registros Akáshicos para nuevos Contratos de Vida. 21 de Junio de 2026.',
  metadataBase: new URL('https://invitacion.bombonesparaelalma.com'),
  openGraph: {
    title: 'MI NUEVO YO - SUSANA MAJUL',
    description:
      'Apertura de Registros Akáshicos para nuevos Contratos de Vida. 21 de Junio de 2026.',
    url: 'https://invitacion.bombonesparaelalma.com',
    siteName: 'Susana Majul – Bombones para el Alma',
    images: [
      {
        url: 'https://invitacion.bombonesparaelalma.com/images/opengraph-mi-nuevo-yo.webp',
        width: 1200,
        height: 630,
        alt: 'MI NUEVO YO – Susana Majul: Apertura de Registros Akáshicos para nuevos Contratos de Vida',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MI NUEVO YO - SUSANA MAJUL',
    description:
      'Apertura de Registros Akáshicos para nuevos Contratos de Vida. 21 de Junio de 2026.',
    images: ['https://invitacion.bombonesparaelalma.com/images/opengraph-mi-nuevo-yo.webp'],
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
