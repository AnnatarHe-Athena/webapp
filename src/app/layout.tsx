import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Athena',
  description: 'Athena - Beauty Image Collection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
