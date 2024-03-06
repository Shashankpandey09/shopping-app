// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const savedItems=JSON.parse(localStorage.getItem('cart'))||[];
const savedItemId=JSON.parse(localStorage.getItem('id'))||[];

const initialState = {
  cartItem: savedItems,
  amount: 1,
  total: 0,
  itemId: savedItemId,
  searchItem: [],

};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddItem: (state, action) => {
      
      state.cartItem.push(action.payload);
      console.log({...action.payload,amount:state.amount})
      state.itemId=[...state.itemId,action.payload.id]
      localStorage.setItem("cart",JSON.stringify(state.cartItem))
      localStorage.setItem("id",JSON.stringify(state.itemId))
    },

    clearCart: (state) => {
      state.cartItem = [];
    },

    removeItem: (state, action) => {
      const updateCart = state.cartItem.filter((item) => item.id !== action.payload);
      state.cartItem = updateCart;
      state.itemId= state.itemId.filter((item) => item !== action.payload)
      localStorage.setItem("cart",JSON.stringify(state.cartItem))
      localStorage.setItem("id",JSON.stringify(state.itemId))
      
    },

    increment: (state, { payload }) => {
      // Handle increment logic if needed
      state.amount+=1;
    },

    decrease: (state, { payload }) => {
      // Handle decrease logic if needed
    },

    calculateTotal: (state) => {
      state.amount = state.cartItem.length;
    },

    
  },
});

export const { AddItem, clearCart, removeItem, increment, decrease, calculateTotal, AddSearch } =
  cartSlice.actions;

export default cartSlice.reducer;
