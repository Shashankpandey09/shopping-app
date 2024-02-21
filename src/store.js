import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/Auth/Auth';
import SidebarReducer from './Slices/Sidebar/Sidebar' 
import HomeReducer from './Slices/Homepage/homepageSlice'
import CartReducer from './Slices/Cart/CartSlice'
export const store=configureStore({
    reducer:{
     auth:authReducer,
     sidebar:SidebarReducer,
     HomeProduct:HomeReducer,
     cart:CartReducer
    }
})