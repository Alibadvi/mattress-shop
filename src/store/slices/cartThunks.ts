// src/store/slices/cartThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const syncCartToServer = createAsyncThunk(
  "cart/sync",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const payload = {
      items: state.cart.items.map(i => ({
        productId: i.id,
        quantity: i.quantity,
      })),
    };
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const res = await fetch("/api/cart");
    return res.json();
  }
);
