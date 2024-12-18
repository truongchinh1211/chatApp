import { createSlice } from "@reduxjs/toolkit"

const initialState= {
    onlineUser : []
}

const OnlineUser= createSlice({
    name: "OnlineUser",
    initialState:initialState,
    reducers: {
        setOnlineUser: (state, { payload }) => {
            state.onlineUser = payload
        }
    },       
})

export const { setOnlineUser } = OnlineUser.actions
export default OnlineUser.reducer