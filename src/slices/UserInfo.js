import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUsersDetails = createAsyncThunk(
  "UserDetail/GetUsersDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const GetSingleUserDetail = createAsyncThunk(
  "UserDetail/GetSingleUserDetail",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "UserDetail/DeleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const UpdateUserRole = createAsyncThunk(
  "UserDetail/UpdateUserRole",
  async ({ id, myForm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  users: [],
  singleUserDetail: null,
  loading: false,
  error: null,
  isDeleted: false,
  isUpdated: false,
  success: false,
};

const UserDetailSlice = createSlice({
  name: "UserDetail",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.success = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUsersDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUsersDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(GetUsersDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetSingleUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSingleUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUserDetail = action.payload.user;
      })
      .addCase(GetSingleUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleted = false;
      })
      .addCase(UpdateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(UpdateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdated = false;
      });
  },
});

export const { resetUserState } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
