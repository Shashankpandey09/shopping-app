import { createSlice} from "@reduxjs/toolkit";
const initialState={
    cartItem:[],
    amount:0,
    total:0,
    isLoading:true,
    searchItem:[]
};



export const cartSlice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        AddItem: (state, action) => {
            const newItem = action.payload[action.payload.length - 1];

            // Check if an item with the same id already exists
            const isDuplicate = state.cartItem.length > 0 && state.cartItem.some((product) => product && product.id == newItem.id);
      
            if (!isDuplicate) {
              state.cartItem=action.payload;
            }
            console.log(state.cartItem)
          },
        
        clearCart:(state)=>{
            state.cartItem=[];
        },
        removeItem:(state,action)=>{
        let updateCart=state.cartItem.filter((item)=>item.id!==action.payload)
          state.cartItem=updateCart;
        },
            // const itemId=action.payload;
            // state.cartItem=state.cartItem.filter((item)=>item.id!==itemId);
          
        increment:(state,{payload})=>{
            // const cartItem=state.cartItem.find((item)=>item.id===payload.id)
            // cartItem.amount=cartItem.amount+1;
        },
        decrease:(state,{payload})=>{
        
            // const cartItem=state.cartItem.find((item)=>item.id===payload.id)
            // cartItem.amount=cartItem.amount-1;
        },
        calculateTotal:(state)=>{
         
    
            // state.cartItem.forEach((item)=>{
            //     amount+=item.amount
                
            // })
            state.amount=state.cartItem.length;
          
        },
        AddSearch:(state,action)=>{
            
            // Check if an item with the same id already exists
            const newItem = action.payload[action.payload.length - 1];
            const isDuplicate = state.cartItem.length > 0 && state.cartItem.some((product) => product && product.id == newItem.id);
      
            if (!isDuplicate) {
              state.cartItem=action.payload;
            }
            console.log(state.cartItem)
          },
        
        }
    }
    ,

    
    
  
);
export const {AddItem,clearCart,removeItem,increment,decrease,calculateTotal,AddSearch} =cartSlice.actions
export default cartSlice.reducer;
