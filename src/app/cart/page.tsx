'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import Image from 'next/image'

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart.items)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500">${item.price}</p>
                <div className="flex gap-2 mt-2 items-center">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 text-sm">
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-6 border-t pt-4">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      )}
    </main>
  )
}
