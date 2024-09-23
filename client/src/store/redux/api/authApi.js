
import {toast} from 'react-toastify'
import { baseQueryWithReauth } from './customFetchBase'
import { createApi} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "api",
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
                async onQueryStarted(args,{queryFulfilled}){ 
                        queryFulfilled
                        .then((data)=>{
                            localStorage.setItem('token',data.data.token)})
                        .catch((error)=>{error})
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
                        queryFulfilled
                        .then(()=>toast.success('Đăng ký tài khoản thành công!!'))
                        .catch((er)=>{
                            toast.error(er.error.data)})
                    }catch(er){
                        console.log(er)
                    }
                }
            }),
        
        }
    }
})

export const {useLoginMutation, useRegisterMutation} = authApi
