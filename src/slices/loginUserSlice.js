import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  error: null,
  loading: false,
  isAuthanticated: false,
};
// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/login", userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Asynchronous thunk for register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.get("/api/v1/logout");
    return response.data;
  } catch (err) {
    return err.response.data.message || "Something went wrong";
  }
});

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, rejectWithValue) => {
    try {
      const response = await axios.get("/api/v1/me", {
        withCredentials: true, // Ensure cookies are included in the request
      });
      return response.data; // Assuming the API returns user data here
    } catch (err) {
      // If there is an error, reject with error message
      return rejectWithValue(
        err.response.data.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthanticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "User Registration Failed";
      })

      //logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout request Failed";
      })

      //loadUser
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthanticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "User Load Failed";
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
