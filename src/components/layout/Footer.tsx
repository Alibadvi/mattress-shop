import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm mt-16">
      {/* Newsletter */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-lg font-semibold">
            Join our newsletter for deals & updates
          </h3>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full md:w-64 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {/* Brand Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-white">🛏️ Mattress Shop Iran</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Your trusted destination for premium mattresses in Iran.
            Comfort, quality, and fast delivery at your fingertips.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Twitter /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><Youtube /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2">
            <li><a href="/products" className="hover:text-white">All Products</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white">Discounts</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Warranty Info</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Cookies Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Payment + Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Mattress Shop Iran. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="/payments/visa.svg" alt="Visa" className="h-6" />
            <img src="/payments/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/payments/paypal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
