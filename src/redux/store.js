import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import couponReducer from "./couponSlice";
import ordersReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    couponDetails: couponReducer,
    orders: ordersReducer

  },
});

export default store;