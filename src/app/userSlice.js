import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState: {
        value: {}
    }
,
reducers: {
    set: (state,action) => {
        state.value = action.payload
    },
    remove: state => {state.value = {}}
    },
})

export const {set,remove} = userSlice.actions
export default userSlice.reducer