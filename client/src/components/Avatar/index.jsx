import Image from "../Image"
import defaultAvt from "../../assets/images/default-avatar.jfif"
import PropTypes from 'prop-types'


function Avatar({avatar, className}) {
    const avatarPic = avatar?avatar:defaultAvt
    return ( 
        <span className={`w-[40px] h-[40px] rounded-full overflow-hidden ${className}`}
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