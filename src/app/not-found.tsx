export default function NotFound() {
  return (
    <main className="h-screen flex flex-col justify-center items-center text-center bg-gray-100">
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
      <p className="text-gray-600 text-lg mt-4">صفحه مورد نظر شما یافت نشد.</p>
      <a href="/" className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
        بازگشت به صفحه اصلی
      </a>
    </main>
  );
}
