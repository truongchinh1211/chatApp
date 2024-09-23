import { useState } from "react";
import Image from "../../components/Image";
import logo from '../../assets/images/logo-no-background.svg'
import SearchUser from "../../components/SearchUser";
function HomePage() {
    const[selectedUser,setSelectedUser] = useState(null)
    const[users,setUsers] = useState([])
    return ( 
        <>
        <div className="flex flex-col min-h-screen bg-white max-w-[300px] max-md:hidden">
            <p className="text-2xl font-bold h-16 p-4">Message</p>
            <div className="border-t border-gray-300 w-full"></div>{/* Divider */}
            <div className="flex-grow overflow-x-hidden overflow-y-auto scrollbar">
                {users.length===0 &&(
                    <div>
                        <p className="text-lg text-center text-slate-400">Explore any user to start a conversation with.</p>
                    </div>
                )}
            </div>
        </div>
        {!selectedUser && (
            <div className="flex-grow flex items-center justify-center h-screen">
                <Image src={logo} alt="logo" width={100}  />
            </div>
            )}
        </>
     );
}


export default HomePage;