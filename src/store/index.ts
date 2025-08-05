import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

// ✅ Configure Redux Store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// ✅ Define Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Custom Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
