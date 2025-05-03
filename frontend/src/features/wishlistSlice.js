import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await fetch("https://clothing-app-mu.vercel.app/wishlist");
    const data = response.json();
    return data;
  }
);

export const addWishlistProductAsync = createAsyncThunk(
  "wishlist/addWishlistProductAsync",
  async (proData) => {
    const response = await fetch(
      "https://clothing-app-mu.vercel.app/wishlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proData),
      }
    );
    const data = response.json();
    return data;
  }
);

export const deleteWishlistProductAsync = createAsyncThunk(
  "wishlist/deleteWishlistProductAsync",
  async (pId) => {
    const response = await fetch(
      `https://clothing-app-mu.vercel.app/wishlist/${pId}`,
      {
        method: "DELETE",
      }
    );
    const data = response.json();
    return data;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "success";
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addWishlistProductAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.wishlist)) {
        state.wishlist.push(action.payload);
      } else {
        state.wishlist = [action.payload];
      }
    });
    builder.addCase(deleteWishlistProductAsync.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload.product.productId
      );
    });
  },
});

export default wishlistSlice.reducer;
