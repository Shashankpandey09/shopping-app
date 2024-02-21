import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const LoginUser=createAsyncThunk('auth/LoginUser',async({userName,password})=>{
     try {
     const res=await fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: userName,
    password: password,
    // expiresInMins: 60, // optional
  })
})
if (!res.ok) {
    throw new Error('Login failed');
  }

     const data=await res.json();
     const token=data.token;
     localStorage.setItem('AuthToken',token);
     
     return token;
    
  
     } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
     }
})
export const fetchData= createAsyncThunk('auth/fetchData',async()=>{
    const authToken=localStorage.getItem('AuthToken');
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const userData = await response.json();

    return userData;
            
})

const initialState={
    isLoading:false,
    userData:'',
    token:'',
    status:'idle',
    reject:false
  
};
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
 
    },
    extraReducers:(builder)=>{
        builder
    
        .addCase(LoginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.status='success';
            state.token=action.payload
            console.log(state.token)
        }).addCase(fetchData.fulfilled,(state,action)=>{
            state.userData=action.payload
            
            
        }).addCase(LoginUser.pending,(state)=>{
         state.isLoading=true
         state.reject=false
        
        })
        .addCase(LoginUser.rejected,(state)=>{
            state.isLoading=false;
            state.reject=true;
           
           })
        
    }
});
export const {remove}=authSlice.actions;
export  default authSlice.reducer