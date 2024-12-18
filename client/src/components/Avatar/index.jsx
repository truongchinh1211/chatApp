import Image from "../Image"
import defaultAvt from "../../assets/images/default-avatar.jfif"
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"


function Avatar({avatar, className}) {
    const onlineUser = useSelector(state=>state.onlineUser.onlineUser)
    const avatarPic = avatar?avatar:defaultAvt
    return ( 
        <span className={`size-[40px] rounded-full overflow-hidden ${className}`}
        >
                <Image 
                    src={avatarPic}
                    alt="Avatar" 
                    className='w-full h-full object-cover' 
                />
                </span>
     )
}
Avatar.propTypes = {
    avatar: PropTypes.string, 
    className: PropTypes.string,
}
export default Avatar;