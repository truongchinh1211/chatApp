import {Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PrivateRouteComponent from '../components/PrivateRouteComponent';

function AppRoutes() {
    return ( 
        <Routes>
             <Route path="/" element={<PrivateRouteComponent />}>
                <Route element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
            </Route>


            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to="/auth/register" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
     );
}

export default AppRoutes ;