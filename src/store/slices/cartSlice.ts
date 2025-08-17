import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;        // productId
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  syncing: boolean;
}
const initialState: CartState = { items: [], syncing: false };

// hydrate on app load
export const hydrateCartFromServer = createAsyncThunk("cart/hydrate", async () => {
  const res = await fetch("/api/cart", { cache: "no-store" });
  if (!res.ok) return { items: [] as CartItem[] };
  const data = await res.json();
  const items: CartItem[] = (data.items ?? []).map((i: any) => ({
    id: i.productId,
    name: i.name,
    price: i.price,
    image: i.image ?? "/placeholder.png",
    quantity: i.quantity,
  }));
  return { items };
});

// add/update one product on server
export const addToCartServer = createAsyncThunk(
  "cart/addServer",
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    const res = await fetch("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to add");
    const data = await res.json();
    const items: CartItem[] = (data.items ?? []).map((i: any) => ({
      id: i.productId, name: i.name, price: i.price, image: i.image ?? "/placeholder.png", quantity: i.quantity,
    }));
    return { items };
  }
);

// set qty
export const setQtyServer = createAsyncThunk(
  "cart/setQty",
  async ({ productId, quantity }: { productId: number; quantity: number }, { getState }) => {
    // send full cart via PUT for simplicity
    const state = getState() as any;
    const current: CartItem[] = state.cart.items;
    const next = current.map(i => i.id === productId ? { ...i, quantity } : i);
    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: next.map(i => ({ productId: i.id, quantity: i.quantity })) }),
    });
    if (!res.ok) throw new Error("Failed to set qty");
    const data = await res.json();
    const items: CartItem[] = (data.items ?? []).map((i: any) => ({
      id: i.productId, name: i.name, price: i.price, image: i.image ?? "/placeholder.png", quantity: i.quantity,
    }));
    return { items };
  }
);

// remove item
export const removeItemServer = createAsyncThunk(
  "cart/removeItem",
  async (productId: number) => {
    const res = await fetch(`/api/cart/items/${productId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to remove");
    const data = await res.json();
    const items: CartItem[] = (data.items ?? []).map((i: any) => ({
      id: i.productId, name: i.name, price: i.price, image: i.image ?? "/placeholder.png", quantity: i.quantity,
    }));
    return { items };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // optional optimistic local add
    addLocal: (state, action: PayloadAction<CartItem>) => {
      const ex = state.items.find(i => i.id === action.payload.id);
      if (ex) ex.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    clearLocal: (state) => { state.items = []; },
  },
  extraReducers: (b) => {
    b.addCase(hydrateCartFromServer.fulfilled, (s, a) => { s.items = a.payload.items; });
    b.addCase(addToCartServer.pending, (s) => { s.syncing = true; });
    b.addCase(addToCartServer.fulfilled, (s, a) => { s.syncing = false; s.items = a.payload.items; });
    b.addCase(addToCartServer.rejected, (s) => { s.syncing = false; });

    b.addCase(setQtyServer.pending, (s) => { s.syncing = true; });
    b.addCase(setQtyServer.fulfilled, (s, a) => { s.syncing = false; s.items = a.payload.items; });
    b.addCase(setQtyServer.rejected, (s) => { s.syncing = false; });

    b.addCase(removeItemServer.pending, (s) => { s.syncing = true; });
    b.addCase(removeItemServer.fulfilled, (s, a) => { s.syncing = false; s.items = a.payload.items; });
    b.addCase(removeItemServer.rejected, (s) => { s.syncing = false; });
  },
});

export const { addLocal, clearLocal } = cartSlice.actions;
export default cartSlice.reducer;
