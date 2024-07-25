import { createSlice } from "@reduxjs/toolkit";


export const globalCoinsSlice = createSlice({
    name: 'globalcoins',
    initialState:{
        data:[]
    },
    reducers:{
        setData: (state,action) => {
            state.data = action.payload;
        }
    }
})


export const {setData} =  globalCoinsSlice.actions;
export default globalCoinsSlice.reducer;