import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for updating the profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/me/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/password/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const ForgotPass = createAsyncThunk(
  "profile/ForgotPass",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/password/forgot`,
        formData
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const resetPass = createAsyncThunk(
  "profile/resetPass",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/password/reset/${token}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
  message: null,
};
const updateProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ForgotPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgotPass.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(ForgotPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateState } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
