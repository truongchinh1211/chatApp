import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { connectSocket, disconnectSocket, getSocket } from '.';


export const useSocket = () => {
  const accessToken = useSelector((state) => state.auth.accessToken)
  const prevTokenRef = useRef(null)

  useEffect(() => {
    if (!accessToken || accessToken === prevTokenRef.current) return

    disconnectSocket()

    const socket = connectSocket(accessToken)
    socket.connect()

    prevTokenRef.current = accessToken

    return () => {
      disconnectSocket()
    }
  }, [accessToken])

  return getSocket()
}