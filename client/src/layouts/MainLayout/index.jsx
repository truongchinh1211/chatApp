import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setOnlineUser } from "../../store/redux/features/OnlineUserSlice";

function MainLayout() {
    const dispatch = useDispatch()
    useEffect(()=>{
        const socketConnection = io(import.meta.env.VITE_SOCKET_URL,{
            auth: {
                token: localStorage.getItem('token'),
            }
        })
        socketConnection.on('onlineUser',(data)=>{
            console.log(data)
            dispatch(setOnlineUser(data))
        })
        return()=>{
            socketConnection.disconnect()
        }
    },[dispatch])
    return ( 
    <>
    <div className="flex flex-row">
        <Sidebar />
        <Outlet />
    </div>
    </> 
    );
}

export default MainLayout;