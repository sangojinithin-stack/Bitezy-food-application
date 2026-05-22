import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

  name: "cart",

  initialState: [],

  reducers: {

    addToCart: (
      state,
      action
    ) => {

      const existingItem =
        state.find(
          (item) =>
            item.id ===
            action.payload.id
        );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.push({

          ...action.payload,

          quantity: 1,

        });

      }

    },

    // =========================
    // REMOVE ITEM
    // =========================

    removeCart: (
      state,
      action
    ) => {

      return state.filter(

        (item) =>

          item.id !==
          action.payload

      );

    },

    // =========================
    // INCREMENT QTY
    // =========================

    incrementQty: (
      state,
      action
    ) => {

      const item =
        state.find(

          (i) =>

            i.id ===
            action.payload

        );

      if (item) {

        item.quantity += 1;

      }

    },

    // =========================
    // DECREMENT QTY
    // =========================

    decrementQty: (
      state,
      action
    ) => {

      const item =
        state.find(

          (i) =>

            i.id ===
            action.payload

        );

      if (
        item &&
        item.quantity > 1
      ) {

        item.quantity -= 1;

      } else {

        return state.filter(

          (i) =>

            i.id !==
            action.payload

        );

      }

    },

    // =========================
    // CLEAR CART
    // =========================

    clearCart: () => {

      return [];

    },

  },

});

export const {

  addToCart,

  removeCart,

  incrementQty,

  decrementQty,

  clearCart,

} = cartSlice.actions;

export default cartSlice.reducer;