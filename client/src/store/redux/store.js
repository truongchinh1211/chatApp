import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import authSlice from "./features/authSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        authSlice: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(userApi.middleware)
})

