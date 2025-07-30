import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (accessToken) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token: accessToken,
    },
    autoConnect: false,
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;