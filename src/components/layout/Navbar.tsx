'use client'

import Link from 'next/link'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {Button} from '@/components/ui/button'
import {Menu, ShoppingCart, User} from 'lucide-react'
import {useState} from 'react'
import {usePathname} from 'next/navigation'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-xl font-bold">🛏️ Mattress.ir</Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className={pathname === '/' ? 'text-primary' : 'text-gray-500'}>Home</Link>
                    <Link href="/products"
                          className={pathname === '/products' ? 'text-primary' : 'text-gray-500'}>Products</Link>
                    <Link href="/cart" className={pathname === '/cart' ? 'text-primary' : 'text-gray-500'}>Cart</Link>
                </nav>

                {/* Mobile */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                                <Menu/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[250px]">
                            <nav className="mt-8 flex flex-col gap-4">
                                <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                                <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
                                <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
