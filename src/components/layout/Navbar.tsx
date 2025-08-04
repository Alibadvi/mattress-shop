'use client'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // ✅ Directly compute cart count from Redux
  const cartCount = useSelector((state: RootState) => {
  console.log("Cart Items:", state.cart.items); // ✅ Debug here
  return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
});

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🛏️ Mattress.ir
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={pathname === '/' ? 'text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}>
            Home
          </Link>
          <Link href="/products" className={pathname === '/products' ? 'text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}>
            Products
          </Link>

          {/* ✅ Cart Icon with Badge */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 hover:text-primary transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          {/* ✅ Mobile Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 hover:text-primary transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <nav className="mt-8 flex flex-col gap-4">
                <Link href="/" onClick={() => setOpen(false)} className={pathname === '/' ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>
                  Home
                </Link>
                <Link href="/products" onClick={() => setOpen(false)} className={pathname === '/products' ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>
                  Products
                </Link>
                <Link href="/cart" onClick={() => setOpen(false)} className={pathname === '/cart' ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>
                  Cart
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
