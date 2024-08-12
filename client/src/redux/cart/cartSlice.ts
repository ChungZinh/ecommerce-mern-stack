import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
interface CartItem {
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
    prom_price: number;
    description: string;
    category: string;
    brand: string;
    rating: number;
    numReviews: number;
    countInStock: number;
  };
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartSize: number;
  total: number;
  error: string | null;
  loading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  cartSize: 0,
  total: 0,
  error: null,
  loading: false,
};
export const fetchCart = createAsyncThunk<
  { items: CartItem[] }, // Ensure this matches your API response
  string,
  { rejectValue: string }
>("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-client-id": userId,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();

    // Ensure the response structure matches your expectations
    if (!data || !data.data || !Array.isArray(data.data.items)) {
      throw new Error("Unexpected response structure");
    }

    return { items: data.data.items };
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch cart");
  }
});

export const addItemToCart = createAsyncThunk<
  CartItem,
  { userId: string; productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/addItemToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-client-id": userId,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();
      // Ensure data structure matches your expectations
      if (!data) {
        throw new Error("Unexpected response structure");
      }

      // Find the item with the specified productId
      const item = data.data.items.find(
        (item: { productId: { _id: string } }) =>
          item.productId._id === productId
      );

      console.log("item:", item);

      if (!item) {
        throw new Error("Item not found in cart");
      }

      return item; // Returning the found CartItem
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCart = createAsyncThunk<
  CartItem,
  { userId: string; productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-client-id": userId,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await response.json();

      // Ensure the response structure matches your expectations
      if (!data || !data.data) {
        throw new Error("Unexpected response structure");
      }

      return data.data; // Ensure this is the CartItem object
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update cart");
    }
  }
);

export const removeItemFromCart = createAsyncThunk<
  void,
  { userId: string; productId: string },
  { rejectValue: string }
>(
  "cart/removeItemFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/cart/${userId}/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-client-id": userId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to remove item from cart"
      );
    }
  }
);

export const removeCart = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("cart/removeCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-client-id": userId,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove cart");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to remove cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.cartSize = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.total = state.cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.prom_price,
          0
        );
        state.cartSize = state.cartItems.length; // Update cartSize
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.productId._id === newItem.productId._id
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          state.cartItems[existingItemIndex].quantity = newItem.quantity;
        } else {
          // Add new item
          state.cartItems.push(newItem);
        }
        state.total = state.cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.prom_price,
          0
        );

        state.cartSize = state.cartItems.length; // Update cartSize
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const updatedCart = action.payload;
        state.cartItems = updatedCart.items;
        state.cartSize = updatedCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.total = state.cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.prom_price,
          0
        );

        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const productId = action.meta.arg.productId;
        state.cartItems = state.cartItems.filter(
          (item) => item.productId._id !== productId
        );
        state.total = state.cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.prom_price,
          0
        );

        state.cartSize = state.cartItems.length; // Update cartSize
        state.loading = false;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(removeCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCart.fulfilled, (state) => {
        state.cartItems = [];
        state.total = 0;
        state.cartSize = 0; // Reset cartSize
        state.loading = false;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
