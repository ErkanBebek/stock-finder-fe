import { createSlice } from "@reduxjs/toolkit";


export const usStocksSlice = createSlice({
    name: 'usstocks',
    initialState:{
        data:[]
    },
    reducers:{
        setData: (state,action) => {
            state.data = action.payload;
        }
    }
})


export const {setData} =  usStocksSlice.actions;
export default usStocksSlice.reducer;