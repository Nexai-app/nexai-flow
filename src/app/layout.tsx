"use client";
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css'
import { Providers } from "./providers";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
        {children}
        </AuthProvider>
        </Providers>
        </body>
    </html>
  )
}
