import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isSearched:false,
    cartItem:{},
    search:[]
}
export const homeProducts=createAsyncThunk('Home/HomeProducts',async()=>{
    try {
        const resp=await axios('https://dummyjson.com/products');
        return resp.data
    } catch (error) {
        return error
    }
});
export const SearchProducts=createAsyncThunk('home/SearchProducts',async(query)=>{
    try {
        const resp=await axios(`https://dummyjson.com/products/search?q=${query}`);
        return resp.data
    } catch (error) {
        return error
    }
});

export const homepageProductSlice=createSlice({
    name:'homeProduct',
    initialState,
    reducers:{
        backHome:(state)=>{
            state.isSearched=false;
        }
    },
    extraReducers:(builder)=>{
        builder
       
        .addCase(homeProducts.fulfilled,(state,action)=>{
            console.log(action)
            state.cartItem=action.payload;
           
         
        })
        .addCase(homeProducts.rejected,(action)=>{
         
          console.log(action.payload)
        })
        .addCase(SearchProducts.fulfilled,(state,action)=>{
            state.isSearched=true;
            state.search=action.payload;
            console.log(state.search)
        })
        .addCase(SearchProducts.rejected,(state,action)=>{
            state.isSearched=true;
            console.log(action.payload)
          })
    }

})
export const {backHome}=homepageProductSlice.actions
export default homepageProductSlice.reducer