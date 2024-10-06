import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const OrderDetails = createAsyncThunk(
  "MyOrderSlice/OrderDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`);
      return data.order; // Adjust this depending on your API response structure
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const myOrder = createAsyncThunk(
  "MyOrderSlice/myOrder",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders/me");
      return data.orders; // Adjust this depending on your API response structure
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
//admin --- products list
export const GetAllOrderList = createAsyncThunk(
  "MyOrderSlice/GetAllOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const UpdateOrder = createAsyncThunk(
  "MyOrderSlice/updateOrder",
  async ({ id, myForm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an order
export const DeleteOrder = createAsyncThunk(
  "MyOrderSlice/DeleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
const MyOrderSlice = createSlice({
  name: "MyOrderSlice",
  initialState: {
    orders: [], // Ensure orders is initialized as an empty array
    singleOrderDetails: [], // Initialize with null or a similar placeholder object
    Userorders: [],
    loading: false,
    error: null,
    success: false,
    isdeleted: false,
    isUpdated: false,
  },
  reducers: {
    // Add any synchronous reducers here if needed
    OrderReset: (state) => {
      state.success = false;
      state.isdeleted = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch attempt
      })
      .addCase(myOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.Userorders = action.payload;
      })
      .addCase(myOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(OrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch attempt
      })
      .addCase(OrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(OrderDetails.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload;
      })
      .addCase(GetAllOrderList.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(GetAllOrderList.fulfilled, (state, action) => {
        state.singleOrderDetails = action.payload.orders; // Assuming 'orders' is the key in the returned data
        state.loading = false;
      })
      .addCase(GetAllOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(UpdateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(UpdateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(DeleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(DeleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isdeleted = action.payload.success;
      })
      .addCase(DeleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { OrderReset } = MyOrderSlice.actions;
export default MyOrderSlice.reducer;
