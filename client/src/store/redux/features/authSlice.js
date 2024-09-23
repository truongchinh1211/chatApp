import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:null,
    email:null,
    profilePic:null,
}
const authSlice= createSlice({
    name: "auth",
    initialState:initialState,
    reducers: {
        loggedOut: () => initialState,
        setUser: (state,action)=>{
            const { name, email, profilePic} = action.payload;
            state.name = name;
            state.email = email;
            state.profilePic = profilePic;
        },
    }, 
})

export const { setUser, loggedOut, refreshToken } = authSlice.actions
export default authSlice.reducer