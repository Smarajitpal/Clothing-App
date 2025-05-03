import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users");
  const data = response.json();
  return data;
});

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (userData) => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = response.json();
    return data;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (uId) => {
    const response = await fetch(`http://localhost:3001/users/${uId}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (userData) => {
    const response = await fetch(
      `http://localhost:3001/users/update/${userData._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const data = response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    loggedInUser: {},
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.users)) {
        state.users.push(action.payload);
      } else {
        state.users = [action.payload];
      }
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload._id);
      state.userName = {};
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    });
  },
});

export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
