import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useEffect, useRef } from "react";
import { useDispatch} from "react-redux";
import { setOnlineUser } from "../../store/redux/features/OnlineUserSlice";
import { useSocket } from "../../Socket/useSocket";


function MainLayout() {
    const dispatch = useDispatch()
    const socket = useSocket()
    useEffect(() => {
        if (!socket) return;
    
        socket.on('connect', () => {
          console.log('Socket connected', socket.id)
        })
    
        socket.on('disconnect', () => {
          console.log('Socket disconnected')
        })
        socket.on('onlineUser',(data)=>{
            dispatch(setOnlineUser(data))
        })
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
        }
      }, [socket,dispatch])


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