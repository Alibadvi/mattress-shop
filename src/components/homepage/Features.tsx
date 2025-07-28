const features = [
    { title: '10-Year Warranty', description: 'All mattresses come with long-term warranty' },
    { title: 'Free Delivery', description: 'We deliver anywhere in Iran — fast and free' },
    { title: 'No Signup Needed', description: 'Guest checkout available for everyone' },
]

const Features = () => {
    return (
        <section className="py-12 px-6 bg-white text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                {features.map((f, idx) => (
                    <div key={idx} className="bg-gray-100 p-6 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{f.title}</h3>
                        <p className="text-sm mt-2 text-gray-600">{f.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
