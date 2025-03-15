import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Undangan Bukber Bahrul Ulum 2025',
  description: 'Created with niat',
  generator: 'Farhan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
