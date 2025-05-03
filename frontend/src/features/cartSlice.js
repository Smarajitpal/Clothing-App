import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch("http://localhost:3001/cart");
  const data = response.json();
  return data;
});

export const addProductAsync = createAsyncThunk(
  "cart/addProductAsync",
  async (proData) => {
    const response = await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proData),
    });
    const data = response.json();
    return data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "cart/deleteProductAsync",
  async (pId) => {
    const response = await fetch(`http://localhost:3001/cart/${pId}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "cart/updateProductAsync",
  async (dataToUpdate) => {
    const response = await fetch("http://localhost:3001/cart/quantityUpdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToUpdate),
    });
    const data = await response.json();
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
    totalItems: 0,
    totalItemPrice: 0,
  },
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setTotalItemPrice: (state, action) => {
      state.totalItemPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.cart)) {
        state.cart.push(action.payload);
      } else {
        state.cart = [action.payload];
      }
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (action.payload.product === null) {
        state.cart = [];
      } else {
        state.cart = state.cart.filter(
          (item) => item.productId !== action.payload?.product?.productId
        );
      }
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.cart = state.cart.map((item) =>
        item.productId === action.payload.productId ? action.payload : item
      );
    });
  },
});

export default cartSlice.reducer;
export const { setTotalItemPrice, setTotalItems } = cartSlice.actions;
