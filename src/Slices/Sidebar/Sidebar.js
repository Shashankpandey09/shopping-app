import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://dummyjson.com/products/categories";
const initialState = {
  SideOpen: false,
  products: [],
  status: "idle",
  sidebarProducts: [],
};
export const getProducts = createAsyncThunk("sidebar/getproducts", async () => {
  try {
    const resp = await axios(URL);
    return resp.data;
  } catch (error) {
    return error;
  }
});

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.SideOpen = true;
    },
    closeSideBar: (state) => {
      state.SideOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const { openSideBar, closeSideBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
