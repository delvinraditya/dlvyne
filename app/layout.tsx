import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'dlvyne — Creative studio for design, photography & web',
  description:
    'dlvyne is a creative brand crafting soft, adaptive and expressive work across graphic design, photography, and web development.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d3a5c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontHeading.variable} ${fontBody.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
