'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const cart = useSelector((state: RootState) => state.cart.items)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-right">سبد خرید شما</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-right">سبد خرید شما خالی است.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
              <div className="flex-1 text-right">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500">{item.price.toLocaleString()} تومان</p>
                <div className="flex gap-2 mt-2 items-center justify-end">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm hover:underline"
              >
                حذف
              </button>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between mt-6 border-t pt-4">
            <p className="text-lg font-semibold">جمع کل:</p>
            <p className="text-lg font-bold text-primary">{subtotal.toLocaleString()} تومان</p>
          </div>

          {/* Proceed to Checkout */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-gray-800 text-white py-3 rounded-md mt-4 hover:bg-gray-500 transition"
          >
            ادامه جهت ثبت سفارش
          </button>
        </div>
      )}
    </main>
  )
}
