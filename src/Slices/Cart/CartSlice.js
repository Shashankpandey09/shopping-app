// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const savedItems=JSON.parse(localStorage.getItem('cart'))||[];
const savedItemId=JSON.parse(localStorage.getItem('id'))||[];

const initialState = {
  cartItem: savedItems,
  total: 0,
  itemId: savedItemId,
  searchItem: [],
  amount:1


};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddItem: (state, action) => {
      state.cartItem = [...state.cartItem, { ...action.payload, amount: 1 }];
      console.log(state.cartItem)
      state.itemId = [...state.itemId, action.payload.id];
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
      localStorage.setItem("id", JSON.stringify(state.itemId));
    },

    clearCart: (state) => {
      state.cartItem = [];
      const updatedCart=state.cartItem.map((item)=>item.id==payload.id?{...state.cartItem,amount : item.amount-1}:item)
   
      // Handle decrease logic if needed
      
      state.cartItem = updatedCart;
    },

    removeItem: (state, action) => {
      const updateCart = state.cartItem.filter((item) => item.id !== action.payload);
      state.cartItem = updateCart;
      state.itemId= state.itemId.filter((item) => item !== action.payload)
      localStorage.setItem("cart",JSON.stringify(state.cartItem))
      localStorage.setItem("id",JSON.stringify(state.itemId))
      
    },

    increment: (state, { payload }) => {
      const updatedCartItem = state.cartItem.map((item) =>
        item.id === payload.id ? { ...item, amount: item.amount + 1 } : item
      );
    
      state.cartItem = updatedCartItem;
      state.amount=+1
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
    

    decrease: (state, { payload }) => {
     const updatedCart=state.cartItem.map((item)=>item.id==payload.id?{...item,amount:item.amount-1}:item)
     state.amount=state.amount-1
     state.cartItem=updatedCart
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
      // Handle decrease logic if needed
    },

    calculateTotal: (state) => {
      let total=0
      state.cartItem.forEach((item)=>{
        total=item.amount+total;
      });
      state.amount=total
    },

    
  },
});

export const { AddItem, clearCart, removeItem, increment, decrease, calculateTotal, AddSearch } =
  cartSlice.actions;

export default cartSlice.reducer;
