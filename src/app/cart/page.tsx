'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function CartPage() {
    const cart = useSelector((state: RootState) => state.cart.items)

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} – {item.quantity}x
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
