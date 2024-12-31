import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../store/redux/api/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

function PrivateRouteComponent() {
    const { data, error, isLoading } = useGetUserQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <Navigate to="/auth/login" />;
    }
    return data ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default PrivateRouteComponent;