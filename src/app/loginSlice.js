import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
name: 'login',
initialState:{
    value: false
},
reducers: {
    loggedin:(state) => {state.value = true},
    loggedout: (state) => {state.value = false},
    incrementByAmount: (state,action)=> {state.value += action.payload},
}
})

export const {loggedin, loggedout , incrementByAmount} = loginSlice.actions
export default loginSlice.reducer
