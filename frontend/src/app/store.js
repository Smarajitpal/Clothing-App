import { configureStore } from "@reduxjs/toolkit";
import { clothSlice } from "../features/clothSlice";
import { cartSlice } from "../features/cartSlice";
import { wishlistSlice } from "../features/wishlistSlice";
import { userSlice } from "../features/userSlice";
import { addressSlice } from "../features/addressSlice";
import { orderSlice } from "../features/orderSlice";

export default configureStore({
  reducer: {
    clothes: clothSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    users: userSlice.reducer,
    address: addressSlice.reducer,
    orders: orderSlice.reducer,
  },
});
