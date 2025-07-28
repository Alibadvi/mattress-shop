import {ReactNode} from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {Providers} from '@/store/provider'
import './globals.css'
import '@/components/ui/sheet' // force-loads the module so it's never tree-shaken


export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <Providers>
            <Navbar/>
            <main className="flex-grow">{children}</main>
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}
