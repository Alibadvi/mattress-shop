import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/store/provider'
import { Toaster } from 'sonner' // ✅ Sonner toast renderer
import './globals.css'
import '@/components/ui/sheet'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Providers>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                    <Toaster richColors position="top-right" /> {/* ✅ Add this */}
                </Providers>
            </body>
        </html>
    )
}
