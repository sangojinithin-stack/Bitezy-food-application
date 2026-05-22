import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",

  // =========================
  // INITIAL STATE
  // =========================
  initialState: [],

  reducers: {
    // =========================
    // ADD TO ORDERS
    // =========================
    addOrder: (state, action) => {
      state.push(action.payload);
    },

    // =========================
    // REMOVE SINGLE ORDER
    // =========================
    removeOrder: (state, action) => {
      return state.filter((order) => order.orderId !== action.payload);
    },

    // =========================
    // CLEAR ALL ORDERS
    // =========================
    clearOrder: () => {
      return [];
    },
  },
});

// =========================
// EXPORT ACTIONS
// =========================
export const { addOrder, removeOrder, clearOrder } = orderSlice.actions;

// =========================
// EXPORT REDUCER
// =========================
export default orderSlice.reducer;