import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url='https://dummyjson.com/products/category/'
const initialState={
    categoryProduct:[],
    status:'idle',
}
export const getCategoryProduct=createAsyncThunk('getCategoryProduct/fetchCategoryProduct',async(category)=>{
try {
const resp=await axios(`${url}${category}`)
const detail=resp.data
 return detail;
} catch (error) {
    console.log(error.response);
}
});

export const categoryProductSlice=createSlice({
    name:'categoryProduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategoryProduct.fulfilled,(state,action)=>{
            state.categoryProduct=action.payload;
            console.log(state.categoryProduct);
            state.status='success'
        })
        .addCase(getCategoryProduct.pending,(state)=>{
            state.status='loading'
        })
    }
})
export default categoryProductSlice.reducer;