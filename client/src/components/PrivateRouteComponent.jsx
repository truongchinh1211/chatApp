import { Navigate,Outlet } from "react-router-dom";

function PrivateRouteComponent() {
    const token = localStorage.getItem('token')
    return ( 
        <>
            {token? <Outlet />:<Navigate to='/auth/login' />}
        </>
     );
}

export default PrivateRouteComponent;