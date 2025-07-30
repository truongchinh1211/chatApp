import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { toast } from 'react-toastify'
import { setCredentials } from '../features/authSlice'


const mutex = new Mutex()
const baseUrl = import.meta.env.VITE_API_URL


const baseQuery = fetchBaseQuery({
  baseUrl:baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
          if (refreshResult.data?.token) {
            
            localStorage.setItem('token', refreshResult.data.token)
            result = await baseQuery(args, api, extraOptions)
            api.dispatch(setCredentials(refreshResult.data?.token))
          } else {
            localStorage.removeItem('token')
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
            // window.location.href = '/auth/login'
          }
        // eslint-disable-next-line no-unused-vars
        }catch(er){
          toast.error('Lỗi khi làm mới phiên đăng nhập.')
        } finally {
          release()
        }
      } else {
        toast.error(result.error.data)
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
      
    }
    return result
  }