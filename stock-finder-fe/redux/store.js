import { configureStore  } from "@reduxjs/toolkit";


// bizim data slicelerimız
import trStocksReducer from "./TRstocks/trStocksSlice";
import usStocksReducer from "./USstocks/usStocksSlice";
import globalCoinsReducer from "./GlobalCoins/globalCoinsSlice";
import authReducer from "./Auth/authSlice";

export const store = configureStore({
    reducer:{
        trstocks:trStocksReducer,
        usstocks:usStocksReducer,
        globalcoins:globalCoinsReducer,
        auth:authReducer
    },

})