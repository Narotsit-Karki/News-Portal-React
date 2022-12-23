import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState: {
        value: {},
        isAuthenticated:false,
    }
,
reducers: {
    set: (state,action) => {
        state.value = action.payload
        state.isAuthenticated = true
    },
    remove: state => {
        state.value = {}
        state.isAuthenticated = false
    }
    },
})

export const {set,remove} = userSlice.actions
export default userSlice.reducer