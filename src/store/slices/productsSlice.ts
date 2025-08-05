import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "@/lib/api/products";

export const loadProducts = createAsyncThunk(
  "products/load",
  async (categoryId?: number) => await fetchProducts(categoryId)
);

export const loadProductById = createAsyncThunk(
  "products/loadById",
  async (id: number) => await fetchProductById(id)
);

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [] as any[], selected: null as any, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default productsSlice.reducer;
