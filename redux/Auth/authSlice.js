import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:null,
        loggedIn:false,
        data:[]
    },
    reducers:{
        setData: (state,action) => {
            state.data = action.payload;
        },
        login: (state,action) => {
            state.loggedIn =true;
            state.user = action.payload
        },
        logout: (state,action) => {
            state.loggedIn =false;
            state.data = []

            state.user = null
        }
    }
})


export const {setData,login,logout} =  authSlice.actions;
export default authSlice.reducer;