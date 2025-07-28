import Hero from '@/components/homepage/Hero'
import Features from '@/components/homepage/Features'
import ProductPreview from '@/components/homepage/ProductPreview'

export const metadata = {
    title: 'Best Mattresses in Iran | Comfort & Quality Guaranteed',
    description: 'Shop Persian-made luxury mattresses with fast delivery, guest checkout, and 10-year warranty.',
}

export default function HomePage() {
    return (
        <main className="flex flex-col gap-16">
            <Hero />
            <Features />
            <ProductPreview />
        </main>
    )
}
