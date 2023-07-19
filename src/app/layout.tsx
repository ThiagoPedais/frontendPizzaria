import { AuthProvider } from '@/contexts/AuthContext'
import '../styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toast from '@/components/alert/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TP Pizzaria - Faça seu Login',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toast />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
