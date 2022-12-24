import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import alertReducer from "./alertSlice"
import countryReducer from "./countrySlice"
export const store = configureStore({
    reducer: {
        user:userReducer,
        alert:alertReducer,
        country:countryReducer
    }
})
