import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Undangan Bukber Bahrul Ulum',
  description: 'Created with muhammad farhan',
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
