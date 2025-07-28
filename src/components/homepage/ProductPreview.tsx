const dummyProducts = [
    { id: '1', name: 'Luxury Foam Mattress', price: 2500000 },
    { id: '2', name: 'Classic Spring Mattress', price: 1800000 },
    { id: '3', name: 'Orthopedic Memory Mattress', price: 3200000 },
]

const ProductPreview = () => {
    return (
        <section className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dummyProducts.map(product => (
                    <div
                        key={product.id}
                        className="border p-4 rounded hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.price.toLocaleString()} تومان</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductPreview
