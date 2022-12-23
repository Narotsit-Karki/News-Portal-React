import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name:'alert',
    initialState: {
        value: {
            message: '',
            alert_type: ''
        },
        active: false
    }
,
reducers: {
 
    setAlertMessage: (state,action) => {
        state.value = action.payload
        state.active = true
    },
    removeAlertMessage: (state) => {
        state.value = {}
        state.active = false    
    }

    },
})

export const {setAlertMessage,removeAlertMessage} = alertSlice.actions
export default alertSlice.reducer