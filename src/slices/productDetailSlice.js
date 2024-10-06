import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id) => {
    const response = await fetch(`/api/v1/product/${id}`);
    const data = await response.json();
    return data.product;
  }
);
export const NewReview = createAsyncThunk(
  "product/NewReview",
  async ({ myForm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const data = await axios.put(`/api/v1/review`, myForm, config);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const productDetailSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    status: "idle",
    message: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(NewReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(NewReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(NewReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productDetailSlice.reducer;
