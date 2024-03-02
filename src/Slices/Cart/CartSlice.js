// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  amount: 0,
  total: 0,
  itemId: [],
  searchItem: [],

};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddItem: (state, action) => {
      state.cartItem.push(action.payload);
      state.itemId=[...state.itemId,action.payload.id]
    },

    clearCart: (state) => {
      state.cartItem = [];
    },

    removeItem: (state, action) => {
      const updateCart = state.cartItem.filter((item) => item.id !== action.payload);
      state.cartItem = updateCart;
      state.itemId= state.itemId.filter((item) => item !== action.payload)
    },

    increment: (state, { payload }) => {
      // Handle increment logic if needed
    },

    decrease: (state, { payload }) => {
      // Handle decrease logic if needed
    },

    calculateTotal: (state) => {
      state.amount = state.cartItem.length;
    },

    AddSearch: (state, action) => {
      const newItem = action.payload[action.payload.length - 1];
      const isDuplicate =
        state.cartItem.length > 0 &&
        state.cartItem.some((product) => product && product.id === newItem.id);

      if (!isDuplicate) {
        state.cartItem = action.payload;
      }
    },
  },
});

export const { AddItem, clearCart, removeItem, increment, decrease, calculateTotal, AddSearch } =
  cartSlice.actions;

export default cartSlice.reducer;
