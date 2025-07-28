export default function Footer() {
    return (
        <footer className="bg-gray-100 py-6 px-4 sm:px-8 mt-10 border-t text-sm text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Mattress Shop Iran — All rights reserved.</p>
            <p className="mt-1">Built with ❤️ in Next.js + Tailwind</p>
        </footer>
    )
}
