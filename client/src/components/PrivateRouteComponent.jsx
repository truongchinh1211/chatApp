import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../store/redux/api/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

function PrivateRouteComponent() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetUserQuery()
    useEffect(() => {
        if(error){
            toast.error('Phiên làm việc hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.')
            localStorage.removeItem('token')
            navigate("/auth/login")
        }
    }, [error, navigate])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <Navigate to="/auth/login" />;
    }
    if (data) {
        return <Outlet />;
    }
    return <Navigate to="/auth/login" />
}

export default PrivateRouteComponent;