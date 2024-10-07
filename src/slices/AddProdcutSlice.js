import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Create Product -admin

export const CrateProduct = createAsyncThunk(
  "AddProductSlice/CrateProduct",
  async ({ myForm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      console.log(myForm);
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/admin/product/new`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const AddProductSlice = createSlice({
  name: "AddProductSlice",
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
      .addCase(CrateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CrateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data.product;
        state.success = action.payload.data.success;
      })
      .addCase(CrateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetState } = AddProductSlice.actions;
export default AddProductSlice.reducer;
