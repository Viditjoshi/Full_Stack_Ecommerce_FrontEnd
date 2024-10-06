import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    keyword = "",
    currentpage = 1,
    price = [0, 500000],
    category,
    rating = 0,
  }) => {
    // Construct the URL based on provided parameters
    let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
    if (category) {
      link += `&category=${category}`;
    }

    // Fetch the data from the API
    const response = await fetch(link);
    const data = await response.json();
    return data;
  }
);

export const getAdminProduct = createAsyncThunk(
  "products/getAdminProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data.products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Create a slice for managing products state
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProductCount: 0,
    productcount: 0,
    resultPerPage: 0,
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.productcount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductCount = action.payload.filteredProductCount;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getAdminProduct.pending, (state) => {
        state.status = "loading";
        state.loading = false;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
