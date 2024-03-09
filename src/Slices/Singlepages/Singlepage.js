import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://dummyjson.com/products/';

const initialState = {
  product: {},
  status: 'idle',
};

export const getDetails = createAsyncThunk('singleItem', async (id) => {
  try {
    const res = await axios(`${url}${id}`);
    const detail = res.data;
    return detail;
  } catch (error) {
    console.log(error.response);
  }
});

const SinglePageSlice = createSlice({
  name: 'singlePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.status = 'successful';
      state.product = action.payload;
      console.log(state.product);
    });
  },
});

export default SinglePageSlice.reducer;
