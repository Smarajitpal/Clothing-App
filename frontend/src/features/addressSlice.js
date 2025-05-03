import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (uId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/address/${uId}`
    );
    const data = response.json();
    return data;
  }
);

export const addAddressAsync = createAsyncThunk(
  "address/addAddressAsync",
  async (addressData) => {
    const response = await fetch("https://clothing-app-mu.vercel.app/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "address/deleteAddressAsync",
  async (addressId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/address/${addressId}`,
      {
        method: "DELETE",
      }
    );
    const data = response.json();
    return data;
  }
);
export const deleteAllAddressAsync = createAsyncThunk(
  "address/deleteAllAddressAsync",
  async (aUId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/address/users/${aUId}`,
      {
        method: "DELETE",
      }
    );
    const data = response.json();
    return data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "users/updateAddressAsync",
  async (addressData) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/address/update/${addressData._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      }
    );
    const data = response.json();
    return data;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addAddressAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.address)) {
        state.address.push(action.payload);
      } else {
        state.address = [action.payload];
      }
    });
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      state.address = state.address.filter(
        (a) => a._id !== action.payload.address._id
      );
    });
    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      state.address = state.address.map((add) =>
        add._id === action.payload._id ? action.payload : add
      );
    });
  },
});

export default addressSlice.reducer;
