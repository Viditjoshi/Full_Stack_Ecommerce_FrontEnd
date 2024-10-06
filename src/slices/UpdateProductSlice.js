import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Update Product -admin

export const UpdateProductThank = createAsyncThunk(
  "UpdateProductSlice/UpdateProductThank",
  async ({ myForm, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const UpdateProductSlice = createSlice({
  name: "UpdateProductSlice",
  initialState: {
    product: [],
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    resetState: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateProductThank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProductThank.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.success = action.payload.success;
      })
      .addCase(UpdateProductThank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetState } = UpdateProductSlice.actions;
export default UpdateProductSlice.reducer;
