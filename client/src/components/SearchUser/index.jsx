import { useState } from "react";
import { useGetSearchUsersQuery } from "../../store/redux/api/userApi";
import AccountItem from "../AccountItem"
import PropTypes from 'prop-types'
function SearchUser({ onClose }) {
    const [searchKey, setSearchKey] = useState('')
    const { data, isLoading } = useGetSearchUsersQuery(searchKey, {
        skip: !searchKey,
    })

    const results = data ? data.data : []
    
    return (
        <>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 md:rounded-lg shadow-lg md:w-1/3 md:h-auto w-full h-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
                    &times; 
                </button>
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchKey}
                    onChange={(e)=>setSearchKey(e.target.value)}
                    className="border p-2 rounded-lg w-full mb-4"
                />
                
                <div className="overflow-y-auto md:max-h-60">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : searchKey === '' ? (
                        <p>Type something to search for users.</p>
                    ) : results.length > 0 ? (
                        <AccountItem onClose={onClose} >{results}</AccountItem>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}
SearchUser.propTypes = {
    onClose: PropTypes.func.isRequired,
}
export default SearchUser;