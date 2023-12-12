import { configureStore } from "@reduxjs/toolkit";
import pointReducer from "../features/pointSlice"

const store = configureStore({
    reducer: {
        point: pointReducer ,
    }
})

export default store;