import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  error: string | null;
  loading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addItemToCartSuccess: (state, action) => {
      state.cartItems.push(action.payload);
      state.loading = false;
    },
    addItemToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateItemInCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateItemInCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.loading = false;
    },
    updateItemInCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemFromCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeItemFromCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.loading = false;
    },
    removeItemFromCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addItemToCartStart,
  addItemToCartSuccess,
  addItemToCartFailure,
  removeItemFromCartStart,
  removeItemFromCartSuccess,
  removeItemFromCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
