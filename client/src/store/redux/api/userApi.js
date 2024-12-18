
import { baseQueryWithReauth } from './customFetchBase'
import { createApi} from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUser: builder.query({
                query: () => {
                  console.log("getUser is called");
                  return {
                    url: "/user/user-info",
                    method: "GET",
                  }
                },
                providesTags: () => [{ type: 'User', id: 'USER_INFO' }],
              }),
            updateUser: builder.mutation({
                query: userData => {
                    return{
                        url: "/user/user-info",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: [{ type: 'User', id: 'USER_INFO' }],
            }),
            setAvatar: builder.mutation({
                query: userData => {
                    return{
                        url: "/user/set-avatar",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: [{ type: 'User', id: 'USER_INFO' }],
            }),
            getSearchUsers: builder.query({
                query: (searchKey) => `/user/search-users/${encodeURIComponent(searchKey)}`,
                refetchOnMountOrArgChange: true,
              }),
        }
    }
})

export const { useGetUserQuery, useGetSearchUsersQuery,useUpdateUserMutation, useSetAvatarMutation} = userApi
