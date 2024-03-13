import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url='https://dummyjson.com/products/category/'
const initialState={
    categoryProduct:[],
    status:'idle',
}
export const getCategoryProduct=createAsyncThunk('getCategoryProduct/fetchCategoryProduct',async(car)=>{
try {
const resp=await axios(`${url}${car}`)
const detail=resp.data
console.log(detail)
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
        })
    }
})
export default categoryProductSlice.reducer;