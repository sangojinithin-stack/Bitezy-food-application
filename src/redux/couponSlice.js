import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "./coupon";

const couponSlice = createSlice({
  name: "coupon",

  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },

  reducers: {
    applyCoupon: (state, action) => {
      const finalCoupon = action.payload.toUpperCase();

      if (finalCoupon in coupons) {
        state.code = finalCoupon;
        state.discount = coupons[finalCoupon];
        state.applied = true;

        state.message =
          `Coupon "${finalCoupon}" Applied Successfully 🎉`;
      } else {
        state.code = "";
        state.discount = 0;
        state.applied = false;

        state.message = "Invalid Coupon Code ❌";
      }
    },

    resetCoupon: (state) => {
      state.code = "";
      state.discount = 0;
      state.applied = false;
      state.message = "";
    },
  },
});

export const { applyCoupon, resetCoupon } =
  couponSlice.actions;

export default couponSlice.reducer;