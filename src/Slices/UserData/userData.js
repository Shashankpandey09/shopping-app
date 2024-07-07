import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null
}
export const UserSlice=createSlice({
    name:'userData',
    initialState:initialState,
    reducers:{
    store:(state,action)=>{
        state.user=action.payload;
    },
    logout:(state)=>{
        state.user=null;
    }
    }
})
export const{store,logout}=UserSlice.actions;
export default UserSlice.reducer;
