import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cartThnk = createAsyncThunk(
  "cart/cartThnk",
  async ({ id, quantity }) => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      const product = response.data.product; // Ensure this is the correct path
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        Stock: product.Stock,
        quantity,
      };
    } catch (e) {
      throw new Error("Failed to fetch product");
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], // Initialize from localStorage
    loading: false, // Default loading to false
    shippinginfo: localStorage.getItem("saveShippinginfo")
      ? JSON.parse(localStorage.getItem("saveShippinginfo"))
      : {},
  },

  reducers: {
    saveShippinginfo: (state, action) => {
      state.shippinginfo = action.payload;
      localStorage.setItem(
        "saveShippinginfo",
        JSON.stringify(state.shippinginfo)
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(cartThnk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThnk.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItemIndex = state.cartItems.findIndex(
          (i) => i.id === item.id
        );

        if (existingItemIndex !== -1) {
          // Update existing item
          state.cartItems[existingItemIndex] = {
            ...state.cartItems[existingItemIndex],
            quantity: item.quantity,
          };
        } else {
          // Add new item
          state.cartItems = [...state.cartItems, item];
        }

        // Store updated cart items in localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.loading = false;
      })
      .addCase(cartThnk.rejected, (state) => {
        state.loading = false;
        // Optionally handle error state
      });
  },
});

export const { removeFromCart, saveShippinginfo } = cartSlice.actions;
export default cartSlice.reducer;
