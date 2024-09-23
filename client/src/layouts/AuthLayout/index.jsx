import { Outlet } from "react-router-dom";
import logo from '../../assets/images/logo-no-background.svg'
import Image from "../../components/Image";

function AuthLayout() {
    return ( 
        <>
        <header className={"flex justify-center items-center p-3 shadow-md bg-white"}>
            <Image src={logo} alt="logo" width={70}  />
        </header>
        <div className="flex items-center justify-center">
            <div className="bg-white mt-5 max-w-sm w-full overflow-hidden py-5 px-5 rounded">
            <Outlet />
            </div>
        </div>
        </>
     );
}

export default AuthLayout;