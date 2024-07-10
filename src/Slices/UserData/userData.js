import { createSlice } from "@reduxjs/toolkit";
const initialState={
    data:null
}
export const UserSlice=createSlice({
    name:'userData',
    initialState:initialState,
    reducers:{
    store:(state,action)=>{
        state.data=action.payload;
   
    },
    logout:(state)=>{
        state.data=null;
    }
    }
})
export const{store,logout}=UserSlice.actions;
export default UserSlice.reducer;

