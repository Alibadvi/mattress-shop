'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinkClass = (path: string) =>
        clsx(
            'relative transition-colors hover:text-primary',
            pathname === path ? 'text-primary font-semibold' : 'text-gray-600'
        )

    return (
        <header
            className={clsx(
                'fixed top-0 w-full z-50 transition-all border-b',
                scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-primary transition-colors">
                    🛏️ Mattress.ir
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <Link href="/" className={navLinkClass('/')}>Home</Link>
                    <Link href="/products" className={navLinkClass('/products')}>Products</Link>
                    <Link href="/cart" className={navLinkClass('/cart')}>Cart</Link>
                </nav>

                {/* Icons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/cart" className="relative hover:text-primary">
                        <ShoppingCart size={22} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                            0
                        </span>
                    </Link>
                    <Link href="/account" className="hover:text-primary">
                        <User size={22} />
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[250px]">
                            <nav className="mt-8 flex flex-col gap-6 text-lg">
                                <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                                <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
                                <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
                                <Link href="/account" onClick={() => setOpen(false)}>Account</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
