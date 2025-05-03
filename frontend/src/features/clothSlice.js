import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://clothing-app-mu.vercel.app/clothes");
    const data = response.json();
    return data;
  }
);

export const clothSlice = createSlice({
  name: "clothes",
  initialState: {
    clothes: [],
    status: "idle",
    error: null,
    search: "",
    categoryFilter: [],
    rating: 0,
    sortBy: "",
  },

  reducers: {
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.clothes = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});
export const { setCategoryFilter, setRating, setSortBy, setSearchFilter } =
  clothSlice.actions;
export default clothSlice.reducer;
