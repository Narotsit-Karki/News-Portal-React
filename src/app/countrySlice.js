import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
    name:'country',
    initialState: {
        value: 'au',
    }
,
reducers: {
    setCountry: (state,action) => {
        state.value = action.payload
       
    },
    },
})

export const {setCountry} = countrySlice.actions
export default countrySlice.reducer