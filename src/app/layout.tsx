import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxStoreProvider from '@/redux/provider'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutesData from '@/components/routes/ProtectedRoutesData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blood bank',
  description: 'this page show you the primary interface of Our blood bank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      
        <body className={inter.className} suppressHydrationWarning={true}>
          <ReduxStoreProvider>
            <ProtectedRoutesData>
                  {children}
            </ProtectedRoutesData>
          </ReduxStoreProvider>          
          <Toaster
            position="top-center"
            reverseOrder={true}
          />
        </body>
      
    </html>
  )
}
