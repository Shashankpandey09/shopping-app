import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    status:'idle',
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
            state.status='success';
            state.search=action.payload;
       
        })
        .addCase(SearchProducts.rejected,(state,action)=>{
            state.status='failed';
        
          }). addCase(SearchProducts.pending,(state,action)=>{
            state.status='loading';
          
          })
    }

})
export const {backHome}=homepageProductSlice.actions
export default homepageProductSlice.reducer