
import {toast} from 'react-toastify'
import { baseQueryWithReauth } from './customFetchBase'
import { createApi} from "@reduxjs/toolkit/query/react"
import {  setCredentials } from '../features/authSlice'


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/auth/login",
                        method: "POST",
                        body: userData
                    }
                },
                
                invalidatesTags: [{ type: 'User', id: 'USER_INFO' }],
                async onQueryStarted(args,{queryFulfilled,  dispatch}){ 
                    try{
                        const { data } = await queryFulfilled
                        localStorage.setItem('token',data.token)
                        dispatch(setCredentials(data.token))
                    }catch(er){
                        toast.error(er.error.data)
                    }
                },
            }),

            register: builder.mutation({
                query: userData => {
                    return {
                        url: "/auth/register",
                        method: "POST",
                        body: userData
                    }
                },
                async onQueryStarted(args,{queryFulfilled}){
                    try{
                        await queryFulfilled
                        toast.success('Đăng ký tài khoản thành công!!')
                    }catch(er){
                        toast.error(er.error.data)
                    }
                }
            }),

            logout:builder.mutation({
                query:()=>({
                    url: "auth/logout",
                    method: "POST",
                }),

                async onQueryStarted(args, { queryFulfilled }) {
                    try {
                        await queryFulfilled
                        localStorage.removeItem("token")
                        toast.success("Đăng xuất thành công!")
                    } catch (er) {
                        toast.error(er?.error?.data || "Lỗi khi đăng xuất")
                    }
                },
                invalidatesTags: [{ type: 'User', id: 'USER_INFO' }],
            })
        
        }
    }
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApi
