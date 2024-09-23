import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import {refreshToken } from '../features/authSlice'
import { Mutex } from 'async-mutex'
import { toast } from 'react-toastify'


const mutex = new Mutex()
const baseUrl = import.meta.env.VITE_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl:baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithAuth = async (args, api, extraOptions = {}) => {
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const result = await baseQuery(args, api, {
      ...extraOptions,
      headers: { ...headers, ...extraOptions.headers },
    })
    
    return result
  }


export const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQueryWithAuth(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refreshResult = await baseQueryWithAuth('/refreshToken', api, extraOptions)
          if (refreshResult.data) {
            // localStorage.setItem('token', refreshResult.data.token)
            api.dispatch(refreshToken(refreshResult.data.token))
            result = await baseQueryWithAuth(args, api, extraOptions)
          } else {
            // localStorage.removeItem('token')
            toast.warning('có lỗi xảy ra!! Vui lòng đăng nhập lại')
            window.location.reload()
          }
        } finally {
          release()
        }
      } else {
        toast.error(result.error.data)
        await mutex.waitForUnlock()
        result = await baseQueryWithAuth(args, api, extraOptions)
      }
      
    }
    return result
  }