import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (uId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/orders/${uId}`
    );
    const data = response.json();
    return data;
  }
);

export const addOrderAsync = createAsyncThunk(
  "orders/addOrderAsync",
  async (orderData) => {
    const response = await fetch("https://clothing-app-mu.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = response.json();
    return data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrderAsync",
  async (oId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/orders/${oId}`,
      {
        method: "DELETE",
      }
    );
    const data = response.json();
    return data;
  }
);
export const deleteAllOrdersAsync = createAsyncThunk(
  "orders/deleteAllOrdersAsync",
  async (oUId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/orders/users/${oUId}`,
      {
        method: "DELETE",
      }
    );
    const data = response.json();
    return data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addOrderAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.orders)) {
        state.orders.push(action.payload);
      } else {
        state.orders = [action.payload];
      }
    });
    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (o) => o._id !== action.payload.order._id
      );
    });
    builder.addCase(deleteAllOrdersAsync.fulfilled, (state, action) => {
      state.orders = [];
    });
  },
});
export default orderSlice.reducer;
