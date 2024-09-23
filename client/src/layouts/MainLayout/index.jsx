import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";

function MainLayout() {
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