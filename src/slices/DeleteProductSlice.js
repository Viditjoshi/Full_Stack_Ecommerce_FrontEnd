import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const DeleteProduct = createAsyncThunk(
  "DeleteProductSlice/DeleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const DeleteProductSlice = createSlice({
  name: "DeleteProductSlice",
  initialState: {
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    deleteProductReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteProductReset } = DeleteProductSlice.actions;

export default DeleteProductSlice.reducer;
