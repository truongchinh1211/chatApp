import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { HiUserAdd } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Avatar from "../Avatar";
import { useState } from "react";
import { useGetUserQuery } from "../../store/redux/api/userApi";
import SearchUser from "../SearchUser";


function Sidebar() {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const {data} = useGetUserQuery()
    const [searchUserModal,setSearchUserModal] = useState(false)
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }
    let avatar=''
    if(data){
      avatar = data.profilePic
    }
        
    const openLogoutModal = () => {
        setShowLogoutModal(true);
    }
    
    const closeLogoutModal = () => {
    setShowLogoutModal(false);
    }

    const openSearchUserModal = ()=>{
      setSearchUserModal(true)
    }
    const closeSearchUserModal = ()=>{
      setSearchUserModal(false)
    }

    return (
        <div className="w-12 min-h-screen bg-slate-100 flex flex-col justify-between items-center py-5 text-slate-600">
            <div className="flex flex-col gap-1">
                <NavLink to="/" className={({isActive})=>`${isActive && 'bg-slate-200'} p-2 w-full rounded flex flex-col items-center cursor-pointer hover:bg-slate-200`}>
                    <BiSolidMessageRoundedDetail size={25} />
                </NavLink>
                <div onClick={openSearchUserModal} className= {`p-2 w-full rounded flex flex-col items-center cursor-pointer hover:bg-slate-200`}>
                    <HiUserAdd size={25} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <NavLink to="/profile" className={({isActive})=>`${isActive && 'bg-slate-200'} p-2 w-full rounded flex flex-col items-center cursor-pointer hover:bg-slate-200`}>
                    <Avatar width={'40px'} height={'40px'} avatar={avatar!=''? avatar :null} />
                </NavLink>
                <div onClick={openLogoutModal} className={`p-2 w-full rounded flex flex-col items-center cursor-pointer hover:bg-slate-200`}>
                    <CiLogout size={25} />
                </div>
            </div>


            {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                Yes, log out
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeLogoutModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {searchUserModal &&(
        <SearchUser onClose={closeSearchUserModal} />
      )}

        </div>
      );
}

export default Sidebar;