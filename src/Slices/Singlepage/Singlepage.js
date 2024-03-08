import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    product:{},
    status:'idle'
}
const getDetails=createAsyncThunk('singleItem',async(url)=>{
try {
    const res=await axios(url);
    const detail=await res.data;
    return detail;
} catch (error) {
    console.log(error.response);
}
})
const SinglePageSlice=createSlice({
    name:'singlePage',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getDetails.fulfilled,(state,action)=>{
            state.status='successful',
            state.product=action.payload
            console.log(product)
        })
    }
})