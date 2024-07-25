import { createSlice } from "@reduxjs/toolkit";


export const trStocksSlice = createSlice({
    name: 'trstocks',
    initialState:{
        data:[]
    },
    reducers:{
        setData: (state,action) => {
            state.data = action.payload;
        }
    }
})


export const {setData} =  trStocksSlice.actions;
export default trStocksSlice.reducer;